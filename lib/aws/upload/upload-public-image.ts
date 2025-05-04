import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {v4 as uuidv4} from "uuid";

interface Props {
    formData: FormData
}

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_KEY!,
    },
});

console.log("AWS KEY:", process.env.AWS_ACCESS_KEY); // should print a value
;

export const uploadPublicImage = async ({formData}: Props) => {
    const file = formData.get("file") as File;

    if (!file) {
        return null;
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExtension = file.name.split(".").pop();
    const key = `uploads/${uuidv4()}.${fileExtension}`;

    await s3.send(
        new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: key,
            Body: buffer,
            ContentType: file.type,
        })
    );



    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}