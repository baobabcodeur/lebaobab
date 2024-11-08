// src/dataServices.js

import apiInstance from "./api";


export const getProjectsCount = async () => {
  try {
    const response = await apiInstance.get('/projects');
    return response.data.length;
   
  } catch (error) {
    console.error("Erreur lors de la récupération des projets :", error);
    throw error;
  }
};

export const getAdsCount = async () => {
  try {
    const response = await apiInstance.get('/urgent-ads');
    return response.data.length;
  } catch (error) {
    console.error("Erreur lors de la récupération des annonces urgentes :", error);
    throw error;
  }
};

export const getServicesCount = async () => {
  try {
    const response = await apiInstance.get('/services');
    return response.data.length;
  } catch (error) {
    console.error("Erreur lors de la récupération des services :", error);
    throw error;
  }
};

// export const getTotalRevenue = async () => {
//   try {
//     const response = await apiInstance.get('/revenue/total');
//     return response.data.total;
//   } catch (error) {
//     console.error("Erreur lors de la récupération du revenu total :", error);
//     throw error;
//   }
// };
