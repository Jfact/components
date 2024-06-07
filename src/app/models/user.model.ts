import { AddressModel } from './address.model';
import { SocialsModel } from './socials.model';
import { PreferencesModel } from './preferences.model';
import { SecurityModel } from './security.model';

export interface UserModel {
		password: string; // Field for users to create or enter a password
		profilePicture?: string; // Allow users to upload or select a profile picture
		bio?: string; // Text field for users to write a brief bio or description about themselves
		dateOfBirth?: Date; // Field for collecting users' date of birth
		address?: AddressModel; // Fields for users to enter their postal address
		phoneNumber?: string; // Optional field for users to enter their phone number
		socialMediaLinks?: SocialsModel; // Allow users to link to their social media profiles
		preferences?: PreferencesModel; // Options for users to set their preferences
		securityFeatures?: SecurityModel; // Security features such as 2FA, account recovery, etc.
		termsOfServiceAgreed?: boolean; // User agreement to terms of service
		privacyPolicyAgreed?: boolean; // User agreement to privacy policy
}
