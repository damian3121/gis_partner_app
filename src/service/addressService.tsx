import axios from 'axios';

export interface AddressValue {
  value: string;
}

export interface AddressFilter {
  level: string,
  v: string
}

export interface AddressPktSearch {
  reqs: [
    {
      "pkt_numer": string,
      "pkt_kodPocztowy": string,
      "ul_pelna": string,
      "miejsc_nazwa": string
    }
  ],
  useExtServiceIfNotFound: true
}

export interface PktCoordinates {
  others: [{
    center: string;
  }],
  single: {
    center: string
  }
}

export const addressService = {
  async getAllVoivodeships(): Promise<Array<AddressValue>> {
    const response = await axios.post<Array<AddressValue>>("https://capap.gugik.gov.pl/api/fts/hier/fdict/pkt/woj?cnt=999", [])
    return response.data;
  },

  async getAllCountiesByVoivodeship(filter: Array<AddressFilter>): Promise<Array<AddressValue>> {
    const response = await axios.post<Array<AddressValue>>("https://capap.gugik.gov.pl/api/fts/hier/fdict/pkt/pow?cnt=999", filter)
    return response.data
  },

  async getAllCommunesByCounty(filter: Array<AddressFilter>): Promise<Array<AddressValue>> {
    const response = await axios.post<Array<AddressValue>>("https://capap.gugik.gov.pl/api/fts/hier/fdict/pkt/gmi?cnt=999", filter)
    return response.data
  },

  async getAllCitiesByCommune(filter: Array<AddressFilter>): Promise<Array<AddressValue>> {
    const response = await axios.post<Array<AddressValue>>("https://capap.gugik.gov.pl/api/fts/hier/fdict/pkt/msc?cnt=999", filter)
    return response.data
  },

  async getAllStreetsByCommune(filter: Array<AddressFilter>): Promise<Array<AddressValue>> {
    const response = await axios.post<Array<AddressValue>>("https://capap.gugik.gov.pl/api/fts/hier/fdict/pkt/ulc?cnt=999", filter)
    return response.data
  },

  async getAllBuildingNumbersByStreet(filter: Array<AddressFilter>): Promise<Array<AddressValue>> {
    const response = await axios.post<Array<AddressValue>>("https://capap.gugik.gov.pl/api/fts/hier/fdict/pkt/nr?cnt=999", filter)
    return response.data
  },

  async getAllPostalCodesByStreet(filter: Array<AddressFilter>): Promise<Array<AddressValue>> {
    const response = await axios.post<Array<AddressValue>>("https://capap.gugik.gov.pl/api/fts/hier/fdict/pkt/kod?cnt=999", filter)
    return response.data
  },

  async getCoordinatesByPkt(pkt: AddressPktSearch): Promise<string> {
    const response = await axios.post<Array<PktCoordinates>>("https://capap.gugik.gov.pl/api/fts/gc/pkt?cnt=999", pkt)

    if (response.data[0].single) {
      return response.data[0].single.center
    } else {
      return response.data[0].others[0].center
    }
  }
}