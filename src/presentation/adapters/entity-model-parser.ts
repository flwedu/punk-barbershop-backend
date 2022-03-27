
export default class EntityModelParser {

    toModel(entity: any) {
        const model = Object.create(null);
        // Get all keys and remove the keys starting with "_"
        const keys = Object.keys(entity.props).filter(key => !/^_\w*/.test(key));
        model.id = entity.id;

        for (let key of keys) {
            let keyValue = entity.props[key];
            model[key] = keyValue;
            if (keyValue instanceof Date) {
                model[key] = keyValue.toISOString();
            }
            else if (typeof keyValue == "object") {
                model[key] = keyValue.getValue();
            }
        }
        return model;
    }
}