import { SESClient } from "@aws-sdk/client-ses";
import { S3Client } from "@aws-sdk/client-s3";
import NodeGeocoder from 'node-geocoder';

export const DATABASE = process.env.DATABASE;
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const EMAIL_FROM = process.env.EMAIL_FROM;
export const REPLY_TO = process.env.REPLY_TO;

/*const awsConfig = {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: 'eu-west-1',
    apiVersion: "2010-12-01",
};*/

const awsConfig = {
    region: "eu-west-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  };
  
/*export const AWSSES = new SES(awsConfig);
export const AWSS3 = new S3(awsConfig);*/

export const AWSSES = new SESClient(awsConfig);
export const AWSS3 = new S3Client(awsConfig);

const options = {
    provider: 'google',
    apiKey: process.env.GOOGLE_GEOCODE_API_KEY, // for Mapquest, OpenCage, Google Premier
    formatter: null,
};

export const GOOGLE_GEOCODER = NodeGeocoder(options);
export const JWT_SECRET = process.env.JWT_SECRET;
export const CLIENT_URL = process.env.CLIENT_URL;






