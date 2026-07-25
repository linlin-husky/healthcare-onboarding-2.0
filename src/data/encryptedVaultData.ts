import type { AgentPreset } from './agentDataPresets';
import { AGENT_PRESETS } from './agentDataPresets';

export interface EncryptedVaultRecord {
  vaultId: string; // e.g. "EMME-2026-X89" or PIN "748920"
  passcodePin?: string; // 6-digit PIN
  ownerName: string;
  createdDate: string;
  encryptionAlgorithm: string;
  sha256Fingerprint: string;
  payload: AgentPreset['onboardingData'];
}

export const SAMPLE_VAULTS: EncryptedVaultRecord[] = [
  {
    vaultId: 'EMME-2026-X89',
    passcodePin: '748920',
    ownerName: 'Emma Svensson',
    createdDate: 'July 25, 2026',
    encryptionAlgorithm: 'AES-256-GCM Zero-Knowledge',
    sha256Fingerprint: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    payload: AGENT_PRESETS[0].onboardingData
  },
  {
    vaultId: 'MAX-7741-K92',
    passcodePin: '123456',
    ownerName: 'Max Miller',
    createdDate: 'July 24, 2026',
    encryptionAlgorithm: 'AES-256-GCM Zero-Knowledge',
    sha256Fingerprint: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    payload: AGENT_PRESETS[1].onboardingData
  }
];
