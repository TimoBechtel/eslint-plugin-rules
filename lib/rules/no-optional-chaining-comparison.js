module.exports = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Disallow optional chaining in comparison operators',
			category: 'Possible Errors',
			recommended: false,
		},
		hasSuggestions: true,
		schema: [
			{
				type: 'object',
				properties: {
					operators: {
						type: 'array',
						items: {
							type: 'string',
							enum: ['==', '!=', '===', '!==', '<', '<=', '>', '>='],
						},
						default: ['===', '!=='],
					},
				},
				additionalProperties: false,
			},
		],
		messages: {
			noOptionalChainingComparison:
				'Avoid comparing two optional chaining expressions directly. Use explicit existence checks instead.',
			addExistenceChecks: 'Add explicit existence checks before comparison',
		},
	},

	create(context) {
		const sourceCode = context.getSourceCode();
		const options = context.options[0] || {};
		const comparisonOperators = new Set(options.operators || ['===', '!==']);

		function hasOptionalChaining(node) {
			if (!node) return false;

			// Check if the node itself is optional chaining
			if (node.type === 'ChainExpression') {
				return true;
			}

			// Check if any parent in the expression chain has optional chaining
			if (node.type === 'MemberExpression' && node.optional) {
				return true;
			}

			if (node.type === 'CallExpression' && node.optional) {
				return true;
			}

			// Recursively check object/callee
			if (node.object) {
				return hasOptionalChaining(node.object);
			}

			if (node.callee) {
				return hasOptionalChaining(node.callee);
			}

			return false;
		}

		function getBaseObject(node) {
			const fullText = sourceCode.getText(node);

			// For expressions like data?.user?.id, we want data?.user
			// For expressions like data?.user.id, we want data?.user
			// Find the last property access (either ?.prop or .prop)
			const lastOptionalIndex = fullText.lastIndexOf('?.');

			if (lastOptionalIndex === -1) {
				// No optional chaining, return the whole expression
				return fullText;
			}

			// Return everything up to the last optional chaining
			return fullText.slice(0, lastOptionalIndex);
		}

		return {
			BinaryExpression(node) {
				if (comparisonOperators.has(node.operator)) {
					const leftHasOptional = hasOptionalChaining(node.left);
					const rightHasOptional = hasOptionalChaining(node.right);

					if (leftHasOptional && rightHasOptional) {
						context.report({
							node,
							messageId: 'noOptionalChainingComparison',
							suggest: [
								{
									messageId: 'addExistenceChecks',
									fix(fixer) {
										const leftText = getBaseObject(node.left);
										const rightText = getBaseObject(node.right);
										const operator = node.operator;

										// get the full expressions for comparison without optional chaining
										const leftFullText = sourceCode.getText(node.left);
										const rightFullText = sourceCode.getText(node.right);
										const leftWithoutOptional = leftFullText.replaceAll(
											'?.',
											'.'
										);
										const rightWithoutOptional = rightFullText.replaceAll(
											'?.',
											'.'
										);

										// suggest checking base objects exist before comparison
										const suggestion = `${leftText} && ${rightText} && ${leftWithoutOptional} ${operator} ${rightWithoutOptional}`;

										return fixer.replaceText(node, suggestion);
									},
								},
							],
						});
					}
				}
			},
		};
	},
};
