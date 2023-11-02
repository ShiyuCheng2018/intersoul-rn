const actionTypesConstructor = (requestType:string, successType:string, failureType:string) => {
    return {
        request: () => requestType,
        success: () => successType,
        failure: () => failureType,
        all: function () {
            return [this.request(), this.success(), this.failure()];
        },
    };
};

export default actionTypesConstructor;
