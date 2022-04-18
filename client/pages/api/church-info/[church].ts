import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

export interface ChurchInfo {
  editedBy: string | null;
  churchDescription: string;
  churchName: string;
}

export interface SuccessResponse<T> {
  error: false;
  payload: T | null;
}

export interface FailResponse {
  error: true;
  payload: string;
}

export type RequestResponse<T> = SuccessResponse<T> | FailResponse;

const infoForChurch = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const churchInfo = JSON.parse(req.body) as ChurchInfo;
    try {
      await prisma.churchInfo.upsert({
        where: {
          churchName: churchInfo.churchName,
        },
        create: {
          churchName: churchInfo.churchName,
          churchDescription: churchInfo.churchDescription,
          editedBy: churchInfo.editedBy || 'ANONIM',
        },
        update: {
          churchDescription: churchInfo.churchDescription,
          editedBy: churchInfo.editedBy || 'ANONIM',
        },
      });
      res.send({
        error: false,
        payload: churchInfo,
      } as SuccessResponse<ChurchInfo>);
    } catch (e) {
      console.log(e);
      res.send({
        error: true,
        payload: 'Ups! Ceva nu a mers, incercati din nou mai tarziu',
      } as FailResponse);
    }
  } else {
    const churchName = req.query.church as string;
    console.log(churchName);
    try {
      const churchInfo = await prisma.churchInfo.findFirst({
        where: {
          churchName,
        },
      });
      console.log(churchInfo);
      if (churchInfo)
        res.send({
          error: false,
          payload: churchInfo,
        } as SuccessResponse<ChurchInfo>);
      else
        res.send({
          error: true,
          payload: `Se pare ca nimeni nu a mai incarcat o descriere pentru ${churchName}`,
        } as FailResponse);
    } catch (e) {
      res.send({
        error: true,
        payload: 'Ups! Ceva nu a mers, incercati din nou mai tarziu',
      } as FailResponse);
    }
  }
};

export default infoForChurch;
