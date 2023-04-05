export const STATICS = `api/static/uploads/`
export const AdvisorRegistreApi = `api/auth/register/moshaver`
export const RealStateRegistrationApi = `api/auth/register/amlak`
export const PhoneNamberApi = `api/auth/sendVerificationCode`
export const authenticationApi = `api/auth`
export const getAgencyOwnerApi = `/api/user/getAgencyOwner`
export const ArticlesApi = `/api/article`
export const ContactApi = `api/contactForm/post`
export const NewsApi = `api/property/add`
export const PropertiesApi = `/api/properties`
export const SinglePropertyApi = (id) => `api/properties/single?id=${id}`
export const SingleBlogApi = (normalName) => `api/articles/single?normalName=${normalName}`
export const getAgencyInfoApi = `/api/agency`
export const getNameActiveAgency = `/api/agency/getNameActiveAgency`
export const getUsersApi = `/api/user`
export const getInfoUser = `/api/user/getInfoUser`
export const upsertUser = `/api/user/post`
export const removeUser = `/api/user/remove`
export const createAgency = `/api/user/createAgency`
export const createAgencyAgent = `/api/user/createAgencyAgent`
export const getRealEstateApi = `/api/realEstate`
export const getAdvertisingByUserId = `/api/realEstate/getAdvertisingByUserId`
export const createRealEstateApi = `/api/realEstate/create`
export const searchRealEstateApi = `/api/realEstate/search`
export const creatAagencyApi = `/api/agency/create`
export const removeAagencyApi = `/api/agency/remove`
export const getCityApi = "/api/city"
export const getCityAreaApi = "/api/cityArea"
export const createCityAreaApi = "/api/cityArea/create"
export const removeCityAreaApi = "/api/cityArea/remove"
export const getnestedCityAreaApi = "/api/cityArea/nestedGet"
export const getCityAreaByIdApi = "/api/cityArea/getById"
export const getNoteApi = "/api/note"
export const getNoteByUserId = "/api/note/getNoteByUserId"
export const getReportApi = "/api/report"