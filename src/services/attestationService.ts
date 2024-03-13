/**
 * Copyright 2023 Circle Internet Financial, LTD.  All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
