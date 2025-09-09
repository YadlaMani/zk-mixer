import { Barretenberg } from './index.js';
import { RawBuffer } from '../types/raw_buffer.js';
import { flattenFieldsAsArray, reconstructHonkProof } from '../proof/index.js';
// TODO: once UP is removed we can just roll this into the bas `Barretenberg` class.
export class BarretenbergVerifier {
    constructor(options = { threads: 1 }) {
        this.options = options;
    }
    /** @ignore */
    async instantiate() {
        if (!this.api) {
            const api = await Barretenberg.new(this.options);
            await api.initSRSForCircuitSize(0);
            this.api = api;
        }
    }
    /** @description Verifies a proof */
    async verifyUltraHonkProof(proofData, verificationKey) {
        await this.instantiate();
        const proof = reconstructHonkProof(flattenFieldsAsArray(proofData.publicInputs), proofData.proof);
        return await this.api.acirVerifyUltraHonk(proof, new RawBuffer(verificationKey));
    }
    async destroy() {
        if (!this.api) {
            return;
        }
        await this.api.destroy();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZpZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnL3ZlcmlmaWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBa0IsWUFBWSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsb0JBQW9CLEVBQWEsb0JBQW9CLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUUxRixvRkFBb0Y7QUFFcEYsTUFBTSxPQUFPLG9CQUFvQjtJQVUvQixZQUFvQixVQUEwQixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7UUFBeEMsWUFBTyxHQUFQLE9BQU8sQ0FBaUM7SUFBRyxDQUFDO0lBRWhFLGNBQWM7SUFDZCxLQUFLLENBQUMsV0FBVztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDZCxNQUFNLEdBQUcsR0FBRyxNQUFNLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pELE1BQU0sR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRW5DLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLENBQUM7SUFDSCxDQUFDO0lBRUQsb0NBQW9DO0lBQ3BDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxTQUFvQixFQUFFLGVBQTJCO1FBQzFFLE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXpCLE1BQU0sS0FBSyxHQUFHLG9CQUFvQixDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEcsT0FBTyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLElBQUksU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNkLE9BQU87UUFDVCxDQUFDO1FBQ0QsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzNCLENBQUM7Q0FDRiJ9