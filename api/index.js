export const STATICS = `api/static/uploads/`
export const AdvisorRegistreApi = `api/auth/register/moshaver`
export const RealStateRegistrationApi = `api/auth/register/amlak`
export const PhoneNamberApi = `api/auth/sendVerificationCode`
export const adminLogin = `/api/admin/login`
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
export const getFastRealEstate = `/api/realEstate/getFastRealEstate`
export const getAdvertisingByUserId = `/api/realEstate/getAdvertisingByUserId`
export const createRealEstateApi = `/api/realEstate/create`
export const getSpecial = `/api/realEstate/getSpecial`
export const createAdvertise = `/api/realEstate/createAdvertise`
export const searchRealEstateApi = `/api/realEstate/search`
export const searchUnique = `/api/realEstate/searchUnique`
export const getRealEstateByArea = `/api/realEstate/getRealEstateByArea`
export const getRentRealEstate = `/api/realEstate/getRentRealEstate`
export const getBuyRealEstate = `/api/realEstate/getBuyRealEstate`
export const getUniqueRealEstate = `/api/realEstate/getUniqueRealEstate`
export const creatAagencyApi = `/api/agency/create`
export const removeAagencyApi = `/api/agency/remove`
export const getAllAgency = `/api/agency/getAllAgency`
export const bestAgency = `/api/agency/bestAgency`
export const findAgency = `/api/agency/findAgency`
export const getAgencyById = `/api/agency/getAgencyById`
export const getCityApi = "/api/city"
export const getCityAreaApi = "/api/cityArea"
export const createCityAreaApi = "/api/cityArea/create"
export const removeCityAreaApi = "/api/cityArea/remove"
export const getnestedCityAreaApi = "/api/cityArea/nestedGet"
export const getCityAreaByIdApi = "/api/cityArea/getById"
export const getNoteApi = "/api/note"
export const getNoteByUserId = "/api/note/getNoteByUserId"
export const createNote = "/api/note/createNote"
export const getReportApi = "/api/report"
export const getAdmissionRequest = "/api/agentInterface/getAdmissionRequest"
export const acceptExpert = "/api/agentInterface/acceptExpert"
export const rejectExpert = "/api/agentInterface/rejectExpert"
export const getAgents = "/api/agentInterface/getAgents"
export const getAgentsAgency = "/api/agentInterface/getAgentsAgency"
export const changeAgencyRating = "/api/agencyRatingInterface/changeAgencyRating"
export const JWT_SECRET = "secret_j_secret_w_secrt_t"