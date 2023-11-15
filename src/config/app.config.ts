interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: ['Customer'],
  tenantRoles: ['Business Owner'],
  tenantName: 'Team',
  applicationName: 'Car Sharing Application',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: ['Create bookings.', 'Read car details.', 'Create reviews.', 'Read reviews.'],
  ownerAbilities: ['Manage car models', 'Manage users', 'Manage teams', 'Manage cars'],
  getQuoteUrl: 'https://app.roq.ai/proposal/d98a392e-bb17-4cb0-92d0-66cb681c3afd',
};
