import { all, call } from "@redux-saga/core/effects";
import { categoriesSaga } from "./category/category.saga";
import { UserSaga } from "./user/user.saga";
export function* rootSaga() {
    yield all([call(categoriesSaga),call(UserSaga)]);
}