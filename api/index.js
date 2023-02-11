export const STATICS = `api/static/uploads/`
export const AdvisorRegistreApi = `api/auth/register/moshaver`
export const RealStateRegistrationApi = `api/auth/register/amlak`
export const PhoneNamberApi = `api/auth/sendVerificationCode`
export const authenticationApi = `api/auth`
export const ArticlesApi = `api/articles`
export const ContactApi = `api/contactForm/post`
export const NewsApi = `api/property/add`
export const PropertiesApi = `/api/properties`
export const SinglePropertyApi = (id) => `api/properties/single?id=${id}`
export const SingleBlogApi = (normalName) => `api/articles/single?normalName=${normalName}`
export const getAgencyInfoApi = `/api/agency`
export const getUsersApi = `/api/user`
export const upsertUser = `/api/user/post`
export const removeUser = `/api/user/remove`
export const getRealEstateApi = `/api/realEstate`
export const createRealEstateApi = `/api/realEstate/create`
export const getCityApi = "/api/city"
export const getCityAreaApi = "/api/cityArea"
export const createCityAreaApi = "/api/cityArea/create"
export const removeCityAreaApi = "/api/cityArea/remove"
export const getnestedCityAreaApi = "/api/cityArea/nestedGet"
export const getCityAreaByIdApi = "/api/cityArea/getById"
export const getNoteApi = "/api/note"
export const getReportApi = "/api/report"