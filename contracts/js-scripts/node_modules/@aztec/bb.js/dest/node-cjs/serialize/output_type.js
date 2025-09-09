"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoolDeserializer = BoolDeserializer;
exports.NumberDeserializer = NumberDeserializer;
exports.VectorDeserializer = VectorDeserializer;
exports.BufferDeserializer = BufferDeserializer;
exports.StringDeserializer = StringDeserializer;
const buffer_reader_js_1 = require("./buffer_reader.js");
function BoolDeserializer() {
    return {
        SIZE_IN_BYTES: 1,
        fromBuffer: (buf) => {
            const reader = buffer_reader_js_1.BufferReader.asReader(buf);
            return reader.readBoolean();
        },
    };
}
function NumberDeserializer() {
    return {
        SIZE_IN_BYTES: 4,
        fromBuffer: (buf) => {
            const reader = buffer_reader_js_1.BufferReader.asReader(buf);
            return reader.readNumber();
        },
    };
}
function VectorDeserializer(t) {
    return {
        fromBuffer: (buf) => {
            const reader = buffer_reader_js_1.BufferReader.asReader(buf);
            return reader.readVector(t);
        },
    };
}
function BufferDeserializer() {
    return {
        fromBuffer: (buf) => {
            const reader = buffer_reader_js_1.BufferReader.asReader(buf);
            return reader.readBuffer();
        },
    };
}
function StringDeserializer() {
    return {
        fromBuffer: (buf) => {
            const reader = buffer_reader_js_1.BufferReader.asReader(buf);
            return reader.readString();
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0X3R5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VyaWFsaXplL291dHB1dF90eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBT0EsNENBUUM7QUFFRCxnREFRQztBQUVELGdEQU9DO0FBRUQsZ0RBT0M7QUFFRCxnREFPQztBQXBERCx5REFBa0Q7QUFPbEQsU0FBZ0IsZ0JBQWdCO0lBQzlCLE9BQU87UUFDTCxhQUFhLEVBQUUsQ0FBQztRQUNoQixVQUFVLEVBQUUsQ0FBQyxHQUE4QixFQUFFLEVBQUU7WUFDN0MsTUFBTSxNQUFNLEdBQUcsK0JBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUMsT0FBTyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUIsQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBZ0Isa0JBQWtCO0lBQ2hDLE9BQU87UUFDTCxhQUFhLEVBQUUsQ0FBQztRQUNoQixVQUFVLEVBQUUsQ0FBQyxHQUE4QixFQUFFLEVBQUU7WUFDN0MsTUFBTSxNQUFNLEdBQUcsK0JBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUMsT0FBTyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDN0IsQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBZ0Isa0JBQWtCLENBQUksQ0FBZ0I7SUFDcEQsT0FBTztRQUNMLFVBQVUsRUFBRSxDQUFDLEdBQThCLEVBQUUsRUFBRTtZQUM3QyxNQUFNLE1BQU0sR0FBRywrQkFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBZ0Isa0JBQWtCO0lBQ2hDLE9BQU87UUFDTCxVQUFVLEVBQUUsQ0FBQyxHQUE4QixFQUFFLEVBQUU7WUFDN0MsTUFBTSxNQUFNLEdBQUcsK0JBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUMsT0FBTyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDN0IsQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBZ0Isa0JBQWtCO0lBQ2hDLE9BQU87UUFDTCxVQUFVLEVBQUUsQ0FBQyxHQUE4QixFQUFFLEVBQUU7WUFDN0MsTUFBTSxNQUFNLEdBQUcsK0JBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUMsT0FBTyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDN0IsQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDIn0=