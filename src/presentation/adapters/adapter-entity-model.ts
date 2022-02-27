
export default class EntityModelAdapter {

    toModel(entity: any) {
        const model = Object.create(null);
        const keys = Object.keys(entity.props);
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