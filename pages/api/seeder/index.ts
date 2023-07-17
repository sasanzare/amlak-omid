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
const userSeeder = async () => {
    function generateUser() {
        const roleOptions: role[] = ['agencyAgent', 'agencyOwner', 'normal', 'admin'];
        const role = roleOptions[Math.floor(Math.random() * roleOptions.length)];

        return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            phoneNumber: faker.phone.number("09#########"),
            role,
            userImage: '/img/profile2.png'
        };
    }
    try {
        const users = Array.from({ length: 10 }, generateUser)
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

        const cities = Array.from({ length: 10 }, generateCity);
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

        const cityAreas = cities.flatMap((city) =>
            Array.from({ length: 5 }, () => generateCityArea(city.id))
        );

        await prisma.cityArea.createMany({
            data: cityAreas,
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
async function seedAgencies() {
    function generateAgency(cityId: string, cityAreaId: string, ownerId: string) {
        const statusOptions: requestStatus[] = ['accepted', 'pending', 'denied'];
        const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
        return {
            name: faker.company.name(),
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
            agencies.push(generateAgency(city.id, cityArea.id, ownerId));
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

const seedRealEstates = async () => {
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
            description: faker.lorem.sentence(),
            address: faker.location.streetAddress(),
            roomCount: room,
            meter: faker.datatype.number({ min: 10, max: 100000 }),
            estateImage: 'img/realState/realStateBack.png',
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
            realEstates.push(generateRealEstate(agency.cityId, agency.cityAreaId, agency.ownerId, agency.id))
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
                description: faker.lorem.paragraph(),
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



async function seed() {
    try {
        const cities = await seedCities()
        const cityAreas = await seedCityAreas()
        const users = await userSeeder()
        const agencies = await seedAgencies()
        const realEstates = await seedRealEstates()
        const contact = await seedContactForms();
        const faq = await seedFAQs();
        return { users, cities, cityAreas, agencies, realEstates, faq, contact }
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await prisma.$disconnect();
    }
}