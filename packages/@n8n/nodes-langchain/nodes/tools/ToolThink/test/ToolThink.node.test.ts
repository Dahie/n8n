import { mock } from 'jest-mock-extended';
import type { ISupplyDataFunctions } from 'n8n-workflow';

import { ToolThink } from '../ToolThink.node';

describe('ToolThink', () => {
	const thinkTool = new ToolThink();
	const helpers = mock<ISupplyDataFunctions['helpers']>();
	const executeFunctions = mock<ISupplyDataFunctions>({
		helpers,
	});
	executeFunctions.addInputData.mockReturnValue({ index: 0 });

	describe('Tool response', () => {
		it('should return the same text as response when receiving a text input', async () => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
			executeFunctions.getNodeParameter.mockImplementation(
				(paramName: string, _itemIndex: number) => {
					switch (paramName) {
						case 'description':
							return 'Tool description';
						default:
							return undefined;
					}
				},
			);
			const { response } = await thinkTool.supplyData.call(executeFunctions, 0);
			const res = (await response.invoke('Hello World')) as string;
			expect(res).toEqual('Hello World');
		});
	});
});
