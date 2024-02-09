import { MarriageDataType } from '@/types/MarriageData.types';
import mongoose from 'mongoose';

const MarriageDataSchema = new mongoose.Schema<MarriageDataType>({
  dateOfFillTheForm: String,
  brideName: String,
  bridePhone: String,
  brideEmail: String,
  brideAddress: String,
  groomName: String,
  groomAddress: String,
  groomEmail: String,
  groomPhone: String,
  anythingExtra: String,
  engagementDate: String,
  weadingDate: String,
  bidayOrBaronDate: String,
  // brideSignature: {
  //   url: String,
  // },
  // groomSignature: {
  //   url: String,
  // },
  signature: {
    url: String,
  },
  receptionDate: String,
  nameOfThePackege: {
    title: String,
    Description: [String],
    price: String,
  },
  selectPackegeType: String,
  asirbadGroomDate: String,
  asirbadBrideDate: String,
  asirbad: String,
  asirbadDate: String,
  panakhili: String,
  panakhiliBrideDate: String,
  panakhiliDate: String,
  panakhiliGroomDate: String,
  haldi: String,
  haldiBrideDate: String,
  haldiDate: String,
  haldiGroomDate: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  }
}, { timestamps: true });

const MarriageDataModel = mongoose.models?.Marriages || mongoose.model<MarriageDataType>('Marriages', MarriageDataSchema);

export default MarriageDataModel;
