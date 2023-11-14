import {deleteRequest, get, post, put} from "../../utils/requests";
import {EndPoint} from "../../utils/types/requestTypes";
import snakeToCamel from "../../utils/snakeToCamel";
import {DispatchProp} from "react-redux";

//经过中间件处理的action所具有的标识
export const FETCH_DATA = "FETCH_DATA";
export const POST_DATA = "POST_DATA";
export const PUT_DATA = "PUT_DATA";
export const DELETE_DATA= "DELETE_DATA";

export const fetchAPI = ({dispatch}: {dispatch: DispatchProp}) => (next:any) => (action:any) => {
  const callAPI = action[FETCH_DATA];
  if (typeof callAPI === "undefined") {
    return next(action);
  }

  const { endpoint, schema, types } = callAPI;
  if (typeof endpoint.url !== "string") {
    throw new Error("endpoint必须为字符串类型的URL");
  }
  if (typeof endpoint.isProtected !== "boolean") {
    throw new Error("endpoint必须为BOOLEAN类型的URL");
  }

  if (!schema) {
    throw new Error("必须指定领域实体的schema");
  }
  if (!Array.isArray(types) && types.length !== 3) {
    throw new Error("需要指定一个包含了3个action type的数组");
  }
  if (!types.every((type:any) => typeof type === "string")) {
    throw new Error("action type必须为字符串类型");
  }

  const actionWith = (data:any) => {
    const finalAction = { ...action, ...data };
    delete finalAction[FETCH_DATA];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;

  next(actionWith({ type: requestType }));
  return fetchData(endpoint, schema, dispatch).then(
    (response) =>
      next(
        actionWith({
          type: successType,
          response
        })
      ),
    (error) =>
      next(
        actionWith({
          type: failureType,
          message: error.message || "获取数据失败",
          error: error.error || "获取数据失败",
        })
      )
  );
};

export const postAPI = ({ dispatch }:{dispatch: DispatchProp})  => (next:any) => (action:any) => {
  const callAPI = action[POST_DATA];
  if (typeof callAPI === "undefined") {
    return next(action);
  }

  const { endpoint, schema, types, data } = callAPI;
  if (typeof endpoint.url !== "string") {
    throw new Error("endpoint必须为字符串类型的URL");
  }
  if (typeof endpoint.isProtected !== "boolean") {
    throw new Error("endpoint必须为BOOLEAN类型的URL");
  }
  // if (!schema) {
  // 	throw new Error("必须指定领域实体的schema");
  // }
  if (!Array.isArray(types) && types.length !== 3) {
    throw new Error("需要指定一个包含了3个action type的数组");
  }
  if (!types.every((type:any) => typeof type === "string")) {
    throw new Error("action type必须为字符串类型");
  }

  const actionWith = (data:any) => {
    const finalAction = { ...action, ...data };
    delete finalAction[POST_DATA];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;

  next(actionWith({ type: requestType, payload: data}));
  return postData(endpoint, data, schema, dispatch).then(
    (response) =>
      next(
        actionWith({
          type: successType,
          response: response.data,
          message: response.message,
          payload: data,
        })
      ),
    (error) =>
      next(
        actionWith({
          type: failureType,
          error: error.error || "Failed to post data.",
          code: error.code,
          message: error.message || "Failed to post data.",
        })
      )
  );
};

export const putAPI = ({ dispatch }:{dispatch: DispatchProp})  => (next:any) => (action:any) => {
  const callAPI = action[PUT_DATA];
  if (typeof callAPI === "undefined") {
    return next(action);
  }

  const { endpoint, schema, types, data } = callAPI;
  if (typeof endpoint.url !== "string") {
    throw new Error("endpoint必须为字符串类型的URL");
  }
  if (typeof endpoint.isProtected !== "boolean") {
    throw new Error("endpoint必须为BOOLEAN类型的URL");
  }
  // if (!schema) {
  // 	throw new Error("必须指定领域实体的schema");
  // }
  if (!Array.isArray(types) && types.length !== 3) {
    throw new Error("需要指定一个包含了3个action type的数组");
  }
  if (!types.every((type:any) => typeof type === "string")) {
    throw new Error("action type必须为字符串类型");
  }

  const actionWith = (data:any) => {
    const finalAction = { ...action, ...data };
    delete finalAction[PUT_DATA];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;

  next(actionWith({ type: requestType }));
  return putData(endpoint, data, schema, dispatch).then(
      (response) =>
          next(
              actionWith({
                type: successType,
                response: response.data,
                message: response.message,
                payload: JSON.parse(data),
              })
          ),
      (error) =>
          next(
              actionWith({
                type: failureType,
                error: error.error || "Failed to post data.",
                code: error.code,
                message: error.message || "Failed to post data.",
              })
          )
  );
};

export const deleteAPI = ({ dispatch }:{dispatch: DispatchProp})  => (next:any) => (action:any) => {
    const callAPI = action[DELETE_DATA];
    if (typeof callAPI === "undefined") {
        return next(action);
    }

    const { endpoint, schema, types, data } = callAPI;
    if (typeof endpoint.url !== "string") {
        throw new Error("endpoint必须为字符串类型的URL");
    }
    if (typeof endpoint.isProtected !== "boolean") {
        throw new Error("endpoint必须为BOOLEAN类型的URL");
    }
    // if (!schema) {
    // 	throw new Error("必须指定领域实体的schema");
    // }
    if (!Array.isArray(types) && types.length !== 3) {
        throw new Error("需要指定一个包含了3个action type的数组");
    }
    if (!types.every((type:any) => typeof type === "string")) {
        throw new Error("action type必须为字符串类型");
    }

    const actionWith = (data:any) => {
        const finalAction = { ...action, ...data };
        delete finalAction[DELETE_DATA];
        return finalAction;
    };

    const [requestType, successType, failureType] = types;

    next(actionWith({ type: requestType }));
    return deleteData(endpoint, data, schema, dispatch).then(
        (response) =>
            next(
                actionWith({
                    type: successType,
                    response: response.data,
                    message: response.message,
                    payload: data,
                })
            ),
        (error) =>
            next(
                actionWith({
                    type: failureType,
                    error: error.error || "Failed to delete data.",
                    code: error.code,
                    message: error.message || "Failed to delete data.",
                })
            )
    );
};
//执行网络请求
const fetchData = (endpoint:EndPoint, schema:any, dispatch: DispatchProp) => {
  //console.log(endpoint);
  return get(endpoint, dispatch)
    .then((res) => {
        let data = snakeToCamel(res);
        return schema ? normalizeData(data, schema) : data;
    })
    .catch((error) => Promise.reject(error));
};

const postData = (endpoint:EndPoint, data:any, schema:any, dispatch: DispatchProp) => {
  console.log(endpoint, data, schema);

  return post(endpoint, data, dispatch)
    .then((res) => {
      let data = snakeToCamel(res);
      return schema ? normalizeData(data, schema) : data;
    })
    .catch((error) => Promise.reject(error));
};

const deleteData = (endpoint:EndPoint, data:any, schema:any, dispatch: DispatchProp) => {
    console.log(endpoint, data, schema);

    return deleteRequest(endpoint, data, dispatch)
        .then((res) => {
            let data = snakeToCamel(res);
            return schema ? normalizeData(data, schema) : data;
        })
        .catch((error) => Promise.reject(error));
};

const putData = (endpoint:EndPoint, data:any, schema:any, dispatch: DispatchProp) => {
  console.log(endpoint, data, schema);

  return put(endpoint, data, dispatch)
      .then((res) => {
        let data = snakeToCamel(res);
        return schema ? normalizeData(data, schema) : data;
      })
      .catch((error) => Promise.reject(error));
};

//根据schema, 将获取的数据扁平化处理
export const normalizeData = (rawAPIData:any, schema:any) => {
  let data = rawAPIData;
  const { id, name } = schema;
  let kvObj = {};
  let ids = [];
  if (data.data[name]) {
    if (Array.isArray(data.data[name])) {
      // @ts-ignore
      data.data[name].forEach((item) => {
        // @ts-ignore
        kvObj[item[id]] = item;
        ids.push(item[id]);
      });
    } else {
      if (data.data[name][id]) {
        // @ts-ignore
        kvObj[data.data[name][id]] = data.data[name];
        ids.push(data.data[name][id]);
      } else {
        kvObj = data.data[name];
      }
    }
  } else {
    if (Array.isArray(data.data)) {
      // @ts-ignore
      data.data.forEach((item) => {
        // @ts-ignore
        kvObj[item[id]] = item;
        ids.push(item[id]);
      });
    } else if (data.data[id]) {
      // @ts-ignore
      kvObj[data.data[id]] = data.data;
      ids.push(data.data[id]);
    } else {
      kvObj = data.data;
    }
  }

  return {
    [name]: kvObj,
    ids,
    message: data.message,
  };
};
