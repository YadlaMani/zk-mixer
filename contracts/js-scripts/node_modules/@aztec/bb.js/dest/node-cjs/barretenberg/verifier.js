"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarretenbergVerifier = void 0;
const index_js_1 = require("./index.js");
const raw_buffer_js_1 = require("../types/raw_buffer.js");
const index_js_2 = require("../proof/index.js");
// TODO: once UP is removed we can just roll this into the bas `Barretenberg` class.
class BarretenbergVerifier {
    constructor(options = { threads: 1 }) {
        this.options = options;
    }
    /** @ignore */
    async instantiate() {
        if (!this.api) {
            const api = await index_js_1.Barretenberg.new(this.options);
            await api.initSRSForCircuitSize(0);
            this.api = api;
        }
    }
    /** @description Verifies a proof */
    async verifyUltraHonkProof(proofData, verificationKey) {
        await this.instantiate();
        const proof = (0, index_js_2.reconstructHonkProof)((0, index_js_2.flattenFieldsAsArray)(proofData.publicInputs), proofData.proof);
        return await this.api.acirVerifyUltraHonk(proof, new raw_buffer_js_1.RawBuffer(verificationKey));
    }
    async destroy() {
        if (!this.api) {
            return;
        }
        await this.api.destroy();
    }
}
exports.BarretenbergVerifier = BarretenbergVerifier;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZpZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnL3ZlcmlmaWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlDQUEwRDtBQUMxRCwwREFBbUQ7QUFDbkQsZ0RBQTBGO0FBRTFGLG9GQUFvRjtBQUVwRixNQUFhLG9CQUFvQjtJQVUvQixZQUFvQixVQUEwQixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7UUFBeEMsWUFBTyxHQUFQLE9BQU8sQ0FBaUM7SUFBRyxDQUFDO0lBRWhFLGNBQWM7SUFDZCxLQUFLLENBQUMsV0FBVztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDZCxNQUFNLEdBQUcsR0FBRyxNQUFNLHVCQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRCxNQUFNLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVuQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNqQixDQUFDO0lBQ0gsQ0FBQztJQUVELG9DQUFvQztJQUNwQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsU0FBb0IsRUFBRSxlQUEyQjtRQUMxRSxNQUFNLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUV6QixNQUFNLEtBQUssR0FBRyxJQUFBLCtCQUFvQixFQUFDLElBQUEsK0JBQW9CLEVBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRyxPQUFPLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSx5QkFBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNkLE9BQU87UUFDVCxDQUFDO1FBQ0QsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzNCLENBQUM7Q0FDRjtBQXBDRCxvREFvQ0MifQ==