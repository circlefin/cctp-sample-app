import axios from 'axios'

import { IRIS_ATTESTATION_API_URL } from 'constants/index'

import type { AxiosInstance } from 'axios'

export enum AttestationStatus {
  complete = 'complete',
  pending_confirmations = 'pending_confirmations',
}

export interface AttestationResponse {
  attestation: string | null
  status: AttestationStatus
}
export interface Attestation {
  message: string | null
  status: AttestationStatus
}

const mapAttestation = (attestationResponse: AttestationResponse) => ({
  message: attestationResponse.attestation,
  status: attestationResponse.status,
})

const baseURL = `${IRIS_ATTESTATION_API_URL}/attestations`
const axiosInstance: AxiosInstance = axios.create({ baseURL })

export const getAttestation = async (
  messageHash: string
): Promise<Attestation | null> => {
  try {
    const response = await axiosInstance.get<AttestationResponse>(
      `/${messageHash}`
    )
    return mapAttestation(response?.data)
  } catch (error) {
    // Treat 404 as pending and keep polling
    if (axios.isAxiosError(error) && error?.response?.status === 404) {
      const response = {
        attestation: null,
        status: AttestationStatus.pending_confirmations,
      }
      return mapAttestation(response)
    } else {
      console.error(error)
      return null
    }
  }
}
