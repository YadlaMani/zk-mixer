/* eslint-disable camelcase */
const typeMap = {
    in_ptr: 'Ptr',
    out_ptr: 'Ptr',
    'bb::fr::in_buf': 'Fr',
    'bb::fr::vec_in_buf': 'Fr[]',
    'fr::in_buf': 'Fr',
    'fr::out_buf': 'Fr',
    'fr::vec_in_buf': 'Fr[]',
    'fr::vec_out_buf': 'Fr[]',
    'fq::in_buf': 'Fq',
    'fq::out_buf': 'Fq',
    'fq::vec_in_buf': 'Fq[]',
    'fq::vec_out_buf': 'Fq[]',
    'const uint8_t *': 'Uint8Array',
    uint8_vec_vec_in_buf: 'Uint8Array[]',
    'uint8_t **': 'Uint8Array',
    in_str_buf: 'string',
    out_str_buf: 'string',
    in_buf32: 'Buffer32',
    out_buf32: 'Buffer32',
    'uint32_t *': 'number',
    'const uint32_t *': 'number',
    'affine_element::in_buf': 'Point',
    'affine_element::out_buf': 'Point',
    'const bool *': 'boolean',
    'bool *': 'boolean',
    'multisig::MultiSigPublicKey::vec_in_buf': 'Buffer128[]',
    'multisig::MultiSigPublicKey::out_buf': 'Buffer128',
    'multisig::RoundOnePublicOutput::vec_in_buf': 'Buffer128[]',
    'multisig::RoundOnePublicOutput::out_buf': 'Buffer128',
    'multisig::RoundOnePrivateOutput::in_buf': 'Buffer128',
    'multisig::RoundOnePrivateOutput::out_buf': 'Buffer128',
};
const deserializerMap = {
    out_ptr: 'Ptr',
    'fr::out_buf': 'Fr',
    'fr::vec_out_buf': 'VectorDeserializer(Fr)',
    'fq::out_buf': 'Fq',
    'fq::vec_out_buf': 'VectorDeserializer(Fq)',
    'uint8_t **': 'BufferDeserializer()',
    out_str_buf: 'StringDeserializer()',
    out_buf32: 'Buffer32',
    'uint32_t *': 'NumberDeserializer()',
    'affine_element::out_buf': 'Point',
    'bool *': 'BoolDeserializer()',
    'multisig::MultiSigPublicKey::out_buf': 'Buffer128',
    'multisig::RoundOnePublicOutput::out_buf': 'Buffer128',
    'multisig::RoundOnePrivateOutput::out_buf': 'Buffer128',
};
export function mapType(type) {
    if (typeMap[type]) {
        return typeMap[type];
    }
    throw new Error(`Unknown type: ${type}`);
}
export const mapRustType = mapType;
export function mapDeserializer(type) {
    if (deserializerMap[type]) {
        return deserializerMap[type];
    }
    throw new Error(`Unknown deserializer for type: ${type}`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluZGdlbi9tYXBwaW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw4QkFBOEI7QUFDOUIsTUFBTSxPQUFPLEdBQThCO0lBQ3pDLE1BQU0sRUFBRSxLQUFLO0lBQ2IsT0FBTyxFQUFFLEtBQUs7SUFDZCxnQkFBZ0IsRUFBRSxJQUFJO0lBQ3RCLG9CQUFvQixFQUFFLE1BQU07SUFDNUIsWUFBWSxFQUFFLElBQUk7SUFDbEIsYUFBYSxFQUFFLElBQUk7SUFDbkIsZ0JBQWdCLEVBQUUsTUFBTTtJQUN4QixpQkFBaUIsRUFBRSxNQUFNO0lBQ3pCLFlBQVksRUFBRSxJQUFJO0lBQ2xCLGFBQWEsRUFBRSxJQUFJO0lBQ25CLGdCQUFnQixFQUFFLE1BQU07SUFDeEIsaUJBQWlCLEVBQUUsTUFBTTtJQUN6QixpQkFBaUIsRUFBRSxZQUFZO0lBQy9CLG9CQUFvQixFQUFFLGNBQWM7SUFDcEMsWUFBWSxFQUFFLFlBQVk7SUFDMUIsVUFBVSxFQUFFLFFBQVE7SUFDcEIsV0FBVyxFQUFFLFFBQVE7SUFDckIsUUFBUSxFQUFFLFVBQVU7SUFDcEIsU0FBUyxFQUFFLFVBQVU7SUFDckIsWUFBWSxFQUFFLFFBQVE7SUFDdEIsa0JBQWtCLEVBQUUsUUFBUTtJQUM1Qix3QkFBd0IsRUFBRSxPQUFPO0lBQ2pDLHlCQUF5QixFQUFFLE9BQU87SUFDbEMsY0FBYyxFQUFFLFNBQVM7SUFDekIsUUFBUSxFQUFFLFNBQVM7SUFDbkIseUNBQXlDLEVBQUUsYUFBYTtJQUN4RCxzQ0FBc0MsRUFBRSxXQUFXO0lBQ25ELDRDQUE0QyxFQUFFLGFBQWE7SUFDM0QseUNBQXlDLEVBQUUsV0FBVztJQUN0RCx5Q0FBeUMsRUFBRSxXQUFXO0lBQ3RELDBDQUEwQyxFQUFFLFdBQVc7Q0FDeEQsQ0FBQztBQUVGLE1BQU0sZUFBZSxHQUE4QjtJQUNqRCxPQUFPLEVBQUUsS0FBSztJQUNkLGFBQWEsRUFBRSxJQUFJO0lBQ25CLGlCQUFpQixFQUFFLHdCQUF3QjtJQUMzQyxhQUFhLEVBQUUsSUFBSTtJQUNuQixpQkFBaUIsRUFBRSx3QkFBd0I7SUFDM0MsWUFBWSxFQUFFLHNCQUFzQjtJQUNwQyxXQUFXLEVBQUUsc0JBQXNCO0lBQ25DLFNBQVMsRUFBRSxVQUFVO0lBQ3JCLFlBQVksRUFBRSxzQkFBc0I7SUFDcEMseUJBQXlCLEVBQUUsT0FBTztJQUNsQyxRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLHNDQUFzQyxFQUFFLFdBQVc7SUFDbkQseUNBQXlDLEVBQUUsV0FBVztJQUN0RCwwQ0FBMEMsRUFBRSxXQUFXO0NBQ3hELENBQUM7QUFFRixNQUFNLFVBQVUsT0FBTyxDQUFDLElBQVk7SUFDbEMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNsQixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQztBQUVuQyxNQUFNLFVBQVUsZUFBZSxDQUFDLElBQVk7SUFDMUMsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUMxQixPQUFPLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM1RCxDQUFDIn0=