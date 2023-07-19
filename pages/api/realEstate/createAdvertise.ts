import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "process";
import prisma from "../../../lib/prisma";
import { parseForm } from "../../../lib/parse-form";
import { verify } from "../../../lib/jwt-provider";
import moment from 'jalali-moment';

export const config = {
  api: {
    bodyParser: false,
  },
};

interface RealEstateFields {
  [key: string]: string | number;
}

interface GalleryPhoto {
  realEstateId: number;
  Photos: string;
}

async function createGallery(data: GalleryPhoto[]): Promise<unknown> {
  return prisma.gallery.createMany({
    data,
  });
}

async function createRealEstateHandler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const user = await verify(req, String(env.JWT_SECRET));
  const uploadDirCategory = "advertising";
  const { fields, files } = await parseForm(req, uploadDirCategory);
  const { media, ...restFields } = fields;

  let estateImage = null;
  let data: GalleryPhoto[] = [];

  let isActive = restFields.isActive;

  // Check if it's a new creation
  if (typeof restFields.id === 'undefined') {
    // Get the user's role
    const userRole = user.role;
    const setting = await prisma.setting.findFirst()

    // Get the maximum daily limit based on the user's role
    let maximumDailyLimit;
    if (userRole === 'client') {
      maximumDailyLimit = setting.maximumDailyRealEstatesForClient;
    } else if (userRole === 'agency') {
      maximumDailyLimit = setting.maximumDailyRealEstatesForAgency;
    } else if (userRole === 'agentOfAgencies') {
      maximumDailyLimit = setting.maximumDailyRealEstatesForAgentOfAgencies;
    }

    // Check if the user has exceeded the maximum daily limit
    if (maximumDailyLimit !== undefined) {
      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

      const totalRealEstates = await prisma.realEstate.count({
        where: {
          userId: user.id,
          createdAt: {
            gte: startDate,
            lt: endDate,
          },
        },
      });

      if (totalRealEstates >= maximumDailyLimit) {
        res.status(400).json({ message: 'شما تعداد مجاز روزانه برای ایجاد ملک را تجاوز کرده‌اید.' });
        return;
      }
    }
  }

  if (files.media === undefined) {
    res.status(400).json({ message: 'فایل رسانه برای ملک ارسال نشده است.' });
    return;
  }

  estateImage = JSON.stringify(files.media[0].filepath).split("advertising/")[1].replace('"', "");

  const { meter, price } = restFields;
  const date = moment(restFields.expirationDate, 'jYYYY/jMM/jDD').toDate();

  const estateId: string = String(restFields.id) || '';
  const realEstate = await prisma.realEstate.upsert({
    where: {
      id: estateId,
    },
    update: {
      ...restFields,
      meter: Number(meter),
      price: Number(price),
      expirationDate: date,
      isActive: Boolean(isActive),
      estateImage: estateImage
    },
    create: {
      ...restFields,
      meter: Number(meter),
      price: Number(price),
      expirationDate: date,
      userId: user.id,
      isActive: Boolean(isActive),
      estateImage: estateImage
    },
  });

  if (files.media.length > 1) {
    for (let i = 1; i < files.media.length; i++) {
      data[i - 1] = { realEstateId: realEstate.id, Photos: JSON.stringify(files.media[i].filepath).split("advertising/")[1].replace('"', "") };
    }
    await createGallery(data);
  }

  res.status(200).json({ message: `New post created with ID: ${realEstate.id}` });
}

async function updateHandler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const user = await verify(req, String(env.JWT_SECRET));
  const uploadDirCategory = "advertising";
  const { fields, files } = await parseForm(req, uploadDirCategory);
  const { media, ...restFields } = fields;

  let estateImage = null;
  let data: GalleryPhoto[] = [];

  let isActive = restFields.isActive;
  const setting = await prisma.setting.findFirst()

  if (files.media !== undefined) {
    estateImage = JSON.stringify(files.media[0].filepath).split("advertising/")[1].replace('"', "");

    if (files.media.length === 1) {
      res.status(400).json({ message: 'فایل رسانه برای ملک ارسال نشده است.' });
      return;
    }

    const estateId = restFields.id;

    if (estateId === undefined) {
      res.status(400).json({ message: 'شناسه ملک مورد نیاز است.' });
      return;
    }

    const updatedRealEstate = await prisma.realEstate.upsert({
      where: {
        id: estateId,
      },
      update: {
        ...restFields,
        meter: Number(restFields.meter),
        price: Number(restFields.price),
        isActive: Boolean(isActive),
      },
      create: {
        ...restFields,
        meter: Number(restFields.meter),
        price: Number(restFields.price),
        userId: user.id,
        isActive: Boolean(isActive),
        estateImage: estateImage
      },
    });

    for (let i = 1; i < files.media.length; i++) {
      data[i - 1] = { realEstateId: updatedRealEstate.id, Photos: JSON.stringify(files.media[i].filepath).split("advertising/")[1].replace('"', "") };
    }

    await createGallery(data);

    res.status(200).json({ message: `Post updated with ID: ${updatedRealEstate.id}` });
  } else {
    const estateId = restFields.id;

    if (estateId === undefined) {
      res.status(400).json({ message: 'شناسه ملک مورد نیاز است.' });
      return;
    }

    const updatedRealEstate = await prisma.realEstate.upsert({
      where: {
        id: estateId,
      },
      update: {
        ...restFields,
        meter: Number(restFields.meter),
        price: Number(restFields.price),
        isActive: Boolean(isActive),
      },
      create: {
        ...restFields,
        meter: Number(restFields.meter),
        price: Number(restFields.price),
        userId: user.id,
        isActive: Boolean(isActive),
      },
    });

    res.status(200).json({ message: `Post updated with ID: ${updatedRealEstate.id}` });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    try {
      await createRealEstateHandler(req, res);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  } else if (req.method === "PUT") {
    try {
      await updateHandler(req, res);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  } else {
    res.status(405).send(`The HTTP ${req.method} method is not supported at this route.`);
  }
}
