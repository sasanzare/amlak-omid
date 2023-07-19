import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';
import { faker } from '@faker-js/faker'
import { AdStatus, assignmentType, meter, propertyType, requestStatus, role, roomCount } from '@prisma/client';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,

) {
    if (req.method === "GET") {
        const obj = await seed()
        res.status(200).json(obj);
    }
    else if (req.method === "POST") {
        res.status(200).json({ "status": "ok" });
    }
    else if (req.method === "DELETE") {
        res.status(200).json({ "status": "ok" });
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}
const userSeeder = async (length: number) => {
    function generateUser() {
        const roleOptions: role[] = ['agencyAgent', 'agencyOwner', 'normal', 'admin'];
        const role = roleOptions[Math.floor(Math.random() * roleOptions.length)];
        const { firstName, lastName } = generateRandomPersianName()

        return {
            firstName: `${role}:${firstName}`,
            lastName: `${role}:${lastName}`,
            phoneNumber: faker.phone.number("09#########"),
            role,
            userImage: '/img/profile2.png'
        };
    }
    try {
        const users = Array.from({ length }, generateUser)
        await prisma.user.createMany({
            data: users
        });
        return users
    } catch (error) {
        return false
        console.error('Error seeding data:', error);
    } finally {
        // Disconnect the Prisma client
        await prisma.$disconnect();
    }
}
async function seedCities() {
    function generateCity() {
        return {
            name: faker.location.city(),
        };
    }

    try {

        const cities = [
            { name: 'تهران' },
            { name: 'شیراز' },
            { name: 'اهواز' },
            { name: 'مشهد' },
        ];


        await prisma.city.createMany({
            data: cities,
        });
        console.log('Cities seeded successfully.');
        return true
    } catch (error) {
        console.error('Error seeding cities:', error);
        return false
    } finally {
        await prisma.$disconnect();
    }
}
async function seedCityAreas() {
    function generateCityArea(cityId: string) {
        return {
            name: faker.location.street(),
            cityId,
        };
    }
    try {
        const cities = await prisma.city.findMany();

        const cityAreas = [
            "آب جوار",
            "آبیاری",
            "آرامستان دارالرحمه",
            "ابونصر",
            "ابیوردی",
            "احمدآباد",
            "احمدی",
            "ارم",
            "اسحاق بیگ",
            "اصلاح‌نژاد",
            "اطلسی",
            "امام حسین",
            "بازار",
            "باغ تخت",
            "بالا کفت",
            "بریجستون",
            "بعثت",
            "بنکداران",
            "پارک آزادی",
            "پانصد دستگاه (بلوار رحمت)",
            "پای کتا",
            "پردیس ارم",
            "پودنک",
            "تاچارا",
            "تپه تلویزیون",
            "تحولی",
            "ترکان",
            "ترمینال باربری",
            "تل حسین‌آباد",
            "تلخ داش",
            "تندگویان",
            "جانبازان",
            "جمهوری",
            "جوادیه",
            "چغا",
            "چنچنه",
            "چو گیاه",
            "حافظیه",
            "حسین‌آباد",
            "خلدبرین",
            "خلیلی",
            "دانشگاه شهید باهنر",
            "دباغ خانه",
            "دروازه اصفهان",
            "دروازه کازرون",
            "دست خضر",
            "دشت چنار",
            "دوکوهک",
            "ده پیاله",
            "دینکان",
            "رحمت‌آباد",
            "رضوان",
            "رکن‌آباد",
            "ریشمک",
            "زرگری",
            "زرهی",
            "زند",
            "زیباشهر",
            "سامان",
            "سایت اداری",
            "ستارخان",
            "سجاد (بنی هاشم)",
            "سر باغ",
            "سعدیه",
            "سهل‌آباد",
            "سیلو",
            "سینما سعدی",
            "شاه قلی بیگی",
            "شریف‌آباد",
            "شهر صدرا",
            "شهرک آرین",
            "شهرک امام حسین",
            "شهرک امام رضا (فرگاز)",
            "شهرک امیر کبیر",
            "شهرک ایثار",
            "شهرک باهنر",
            "شهرک برق",
            "شهرک بزین",
            "شهرک بوتان",
            "شهرک پردیس",
            "شهرک پرواز",
            "شهرک جماران",
            "شهرک حجت‌آباد",
            "شهرک دارائی",
            "شهرک سجادیه",
            "شهرک سراج",
            "شهرک سعدی",
            "شهرک شهید بهشتی",
            "شهرک شهید مطهری",
            "شهرک عرفان",
            "شهرک فجر",
            "شهرک قصر قمشه",
            "شهرک کوشکک",
            "شهرک گلستان",
            "شهرک گلستان شمالی",
            "شهرک گلها",
            "شهرک مخابرات",
            "شهرک مدرس",
            "شهرک مهدی‌آباد",
            "شهرک مهرگان",
            "شهرک نصر",
            "شهرک نواب صفوی",
            "شهرک نیروی انتظامی",
            "شهرک والفجر",
            "شهرک ولیعصر",
            "شهید بهنام امیری",
            "شیخ علی چوپان",
            "شیشه‌گری",
            "صاحب الزمان",
            "صاحب دیوان",
            "عادل‌آباد (بلوار عدالت)",
            "عفیف‌آباد",
            "علی‌آباد",
            "فرزانگان",
            "فرهنگ شهر",
            "فرهنگیان",
            "فضل‌آباد",
            "فضیلت",
            "قدوسی شرقی",
            "قدوسی غربی",
            "قصرالدشت",
            "قلعه شاهزاده بیگم",
            "قلعه قبله",
            "قلعه نو",
            "کاراندیش",
            "کفترک",
            "کوزه‌گری",
            "کوی آزادی",
            "کوی زهرا",
            "کوی فرهنگیان",
            "کوی قضات",
            "کوی ولیعصر",
            "کوی یاس",
            "کیان شهر",
            "گلدشت",
            "گلدشت حافظ",
            "گلدشت محمدی",
            "گلدشت معالی‌آباد",
            "گلشن",
            "گلکوب",
            "گود عربان",
            "گویم",
            "لاله",
            "لب آب",
            "لشکری",
            "ماه فیروزان",
            "محراب",
            "محله انجیر (کلبه)",
            "محله سر دزک",
            "محله سنگ سیاه",
            "محله طلاب (نیستان)",
            "محمدیه",
            "محمودیه",
            "مسلم",
            "مشیر غربی",
            "معالی‌آباد",
            "مقر",
            "ملاصدرا",
            "منصورآباد",
            "منطقه هوایی دوران",
            "مهدی‌آباد",
            "مهدیه",
            "میانرود",
            "میدان شاه",
            "نارنجستان",
            "نشاط",
            "نصرآباد",
            "نیایش",
            "وحدت (بلوار مدرس)",
            "وزیرآباد",
            "وصال",
            "ویلاشهر کیمیا",
            "هفت تنان",
            "هویزه"
        ];
        const dbCityAreas = cities.flatMap((city) =>
            cityAreas.map(cityArea => {
                return { name: cityArea, cityId: city.id }
            })
        );

        await prisma.cityArea.createMany({
            data: dbCityAreas,
        });

        console.log('City Areas seeded successfully.');
        // console.log(cityAreas)
        return true
    } catch (error) {
        console.error('Error seeding city areas:', error);
        return false
    } finally {
        await prisma.$disconnect();
    }
}
async function seedAgencies(length: number) {
    function generateAgency(cityId: string, cityAreaId: string, ownerId: string) {
        const statusOptions: requestStatus[] = ['accepted', 'pending', 'denied'];
        const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
        const agencyName = generateRandomAgencyName()
        return {
            name: agencyName,
            agencyImage: '/img/realState/realStateBack.png',
            businessIdImage: faker.image.url(),
            ownerId: ownerId, // Replace 'user-id' with the actual user ID for the owner
            cityId,
            cityAreaId,
            phoneNumber: faker.phone.number("+9871########"),
            businessId: faker.string.numeric(),
            latitude: String(faker.location.latitude()),
            longitude: String(faker.location.longitude()),
            isActive: faker.datatype.boolean(),
            status: status,
        };
    }
    try {
        const cities = await prisma.city.findMany();
        const agencies = []
        for (const city of cities) {
            // Find city areas for the current city
            const cityAreas = await prisma.cityArea.findMany({ where: { cityId: city.id } });

            // Randomly select a city area
            const cityArea = cityAreas[Math.floor(Math.random() * cityAreas.length)];

            // Find an agency for the selected city area
            const agencyOwnerUsers = await prisma.user.findMany({
                where: {
                    role: role.agencyOwner,
                },
                select: {
                    id: true,
                },
            });
            const ownerIds = agencyOwnerUsers.map((user) => user.id);
            const ownerId = ownerIds[Math.floor(Math.random() * ownerIds.length)];
            for (let i = 0; i < length; i++) {
                agencies.push(generateAgency(city.id, cityArea.id, ownerId));

            }
        }
        // return agencies
        await prisma.agency.createMany({
            data: agencies,
        });

        console.log('Agencies seeded successfully.');
        return true
    } catch (error) {
        console.error('Error seeding agencies:', error);
        return false
    } finally {
        await prisma.$disconnect();
    }
}

const seedRealEstates = async (length = 5) => {
    // Find all cities
    function generateRealEstate(cityId: string, cityAreaId: string, userId: string, agencyId: string) {
        const roomCountOptions: roomCount[] = ['one', 'two', 'three', 'four', 'five'];
        const room = roomCountOptions[Math.floor(Math.random() * roomCountOptions.length)];
        const meterOptions: meter[] = ['m10', 'm150', 'm220', 'm90'];
        const meter = meterOptions[Math.floor(Math.random() * meterOptions.length)];
        const assignmentTypeOptions: assignmentType[] = ['rental', 'forSale', 'fastSale', 'special'];
        const type = assignmentTypeOptions[Math.floor(Math.random() * assignmentTypeOptions.length)];
        let expirationDate
        if (type == 'fastSale') {
            expirationDate = new Date(Date.now() + 1000 * 3600 * 24 * 12)
        }
        const propertyTypeOptions: propertyType[] = ['c', 'v', 'a', 'l', 'i'];
        const propertyType = propertyTypeOptions[Math.floor(Math.random() * propertyTypeOptions.length)];
        const adStatusOptions: AdStatus[] = ['awaitingConfirmation', 'awaitingPayment', 'Deleted', 'active', 'expired'];
        const adStatus = adStatusOptions[Math.floor(Math.random() * adStatusOptions.length)];

        return {
            agencyId: agencyId, // Replace with the agency ID if applicable
            userId: userId, // Replace with the user ID if applicable
            name: faker.company.name(),
            phoneNumber: faker.phone.number('+9871########'),
            description: persianLoremIpsum(),
            address: faker.location.streetAddress(),
            roomCount: room,
            meter: faker.datatype.number({ min: 10, max: 100000 }),
            estateImage: '/img/realState/realStateBack.png',
            assignmentType: type,
            type: propertyType,
            price: faker.datatype.number({ min: 1000000, max: 10000000000 }),
            cityId,
            cityAreaId,
            latitude: String(faker.location.latitude()),
            longitude: String(faker.location.longitude()),
            isActive: faker.datatype.boolean(),
            AdStatus: adStatus,
            expirationDate
        };
    }
    try {
        const agencies = await prisma.agency.findMany();
        const realEstates = []
        for (const agency of agencies) {
            for (let i = 0; i < length; i++) {
                realEstates.push(generateRealEstate(agency.cityId, agency.cityAreaId, agency.ownerId, agency.id))
            }
        }
        await prisma.realEstate.createMany({
            data: realEstates
        });
        return true
    }
    catch (error) {
        console.log(error)
        return false
    }
    finally {
        await prisma.$disconnect()
    }
};
async function seedContactForms() {
    try {

        const contactFormsData = [];

        for (let i = 0; i < 10; i++) {
            const formData = {
                fullName: faker.person.fullName(),
                email: faker.internet.email(),
                title: faker.lorem.words(3),
                description: persianLoremIpsum(),
            };

            contactFormsData.push(formData);
        }


        for (const formData of contactFormsData) {
            await prisma.contactFrom.create({
                data: formData,
            });
        }
        return true
    }
    catch (error) {
        console.log(error)
        return false
    }
    finally {
        prisma.$disconnect()
    }
}

async function seedFAQs() {
    try {
        const faqsData = [];

        for (let i = 0; i < 10; i++) {
            const faqData = {
                question: faker.lorem.sentence(),
                answer: faker.lorem.paragraphs(2),
                status: faker.datatype.boolean(),
            };

            faqsData.push(faqData);
        }

        for (const faqData of faqsData) {
            await prisma.faq.create({
                data: faqData,
            });
        }
        return true
    }
    catch (error) {
        console.log(error)
        return true
    }
    finally {
        prisma.$disconnect()
    }
}



const seedArticles = async () => {
    try {
        const users = await prisma.user.findMany({
            where: {
                role: 'admin'
            }
        });

        const articles = users.map(user => ({
            userId: user.id,
            title: persianLoremIpsum(),
            summary: persianLoremIpsum(),
            text: persianLoremIpsum(),
            normalName: faker.lorem.slug(),
            articleImage: '/img/profile2.png'
        }));

        await prisma.article.createMany({
            data: articles,
        });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await prisma.$disconnect();
    }
};
const persianLoremIpsum = (numSentences = 15) => {
    const words = [
        'پرشین',
        'لورم',
        'ایپسوم',
        'متنی',
        'برای',
        'تست',
        'طراحی',
        'صفحات',
        'وب',
        'تولید',
        'شده',
        'است',
    ];

    let result = '';
    for (let i = 0; i < numSentences; i++) {
        let sentence = '';
        const numWords = Math.floor(Math.random() * 5) + 1; // Generate a random number of words per sentence
        for (let j = 0; j < numWords; j++) {
            const randomIndex = Math.floor(Math.random() * words.length);
            const word = words[randomIndex];
            sentence += word + ' ';
        }
        result += sentence.trim() + '. ';
    }

    return result.trim();
};


const seedAgentInterfaces = async () => {
    try {
        // Find users with the role 'agencyAgent'
        const agentUsers = await prisma.user.findMany({
            where: {
                role: 'agencyAgent',
            },
        });

        // Find agencies
        const agencies = await prisma.agency.findMany();

        const agentInterfaces = [];

        // Assign 5 random agents to each agency
        for (const agency of agencies) {
            const randomAgents = getRandomElements(agentUsers, 5);
            for (const agent of randomAgents) {
                const agentInterface = {
                    userId: agent.id,
                    agencyId: agency.id,
                };
                agentInterfaces.push(agentInterface);
            }
        }

        await prisma.agentInterface.createMany({
            data: agentInterfaces,
        });

        return true;
    } catch (error) {
        console.log(error);
        return false;
    } finally {
        await prisma.$disconnect();
    }
};

// Helper function to get random elements from an array
const getRandomElements = (array, count) => {
    const shuffled = array.slice();
    let i = array.length;
    let temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, count);
};
function generateRandomPersianName() {
    const firstNameWords = [
        'علی',
        'محمد',
        'زهرا',
        'فاطمه',
        'حسین',
        'سارا',
        'رضا',
        'نیلوفر',
        'امیر',
        'مهدی',
        'سحر',
        'علیرضا',
        'محبوبه',
        'رامین',
        'نادیا',
    ];

    const lastNameWords = [
        'احمدی',
        'رحمانی',
        'کریمی',
        'میرزایی',
        'صادقی',
        'محمدیان',
        'جعفری',
        'مصدقی',
        'حسینی',
        'رضایی',
        'نوروزی',
        'معماری',
        'فرشادی',
        'خسروی',
        'رحیمی',
    ];

    const randomFirstNameIndex = Math.floor(Math.random() * firstNameWords.length);
    const randomLastNameIndex = Math.floor(Math.random() * lastNameWords.length);

    const firstName = firstNameWords[randomFirstNameIndex];
    const lastName = lastNameWords[randomLastNameIndex];

    return {
        firstName,
        lastName,
    };
}

function generateRandomAgencyName() {
    const agencyNameWords = [
        'پردیس',
        'آرین',
        'باران',
        'نگار',
        'مهرگان',
        'نور',
        'پویا',
        'شکوفه',
        'پیشرو',
        'آتیه',
        'سپیده',
        'راهنما',
        'شهرزاد',
        'آتشین',
        'درخشان',
    ];

    const randomIndex = Math.floor(Math.random() * agencyNameWords.length);
    const agencyName = agencyNameWords[randomIndex];

    return agencyName;
}

async function seedSeeting() {
    prisma.setting.create({
        data: {
            maximumDailyRealEstatesForAgency: 10,
            maximumNumberOfRooms: 20,
            maximumDailyRealEstatesForClient: 3,
            maximumDailyRealEstatesForAgentOfAgencies: 5,

        }
    })
}


async function seed() {
    try {
        const cities = await seedCities()
        const cityAreas = await seedCityAreas()
        const users = await userSeeder(100)
        const agencies = await seedAgencies(3)
        const realEstates = await seedRealEstates(3)
        const contact = await seedContactForms();
        const articles = await seedArticles()
        const agents = await seedAgentInterfaces()
        const faq = await seedFAQs();
        return { users, cities, cityAreas, agencies, realEstates, faq, contact, articles, agents }
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await prisma.$disconnect();
    }
}