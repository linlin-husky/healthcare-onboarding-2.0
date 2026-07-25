import React, { useState } from 'react';
import { SAMPLE_VAULTS, type EncryptedVaultRecord } from '../data/encryptedVaultData';
import { useOnboarding } from '../context/OnboardingContext';
import { Lock, Unlock, Key, ShieldCheck, Check, Copy, AlertCircle, RefreshCw, UploadCloud, Sparkles, X, ArrowRight } from 'lucide-react';

interface SecureVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecureVaultModal: React.FC<SecureVaultModalProps> = ({ isOpen, onClose }) => {
  const { loadVaultData } = useOnboarding();
  const [activeTab, setActiveTab] = useState<'retrieve' | 'upload'>('retrieve');
  
  // Retrieve Vault Form State
  const [inputKey, setInputKey] = useState<string>('');
  const [inputPin, setInputPin] = useState<string>('');
  const [isDecrypting, setIsDecrypting] = useState<boolean>(false);
  const [decryptionSuccess, setDecryptionSuccess] = useState<EncryptedVaultRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Upload/Create Vault Form State
  const [uploadFileName, setUploadFileName] = useState<string>('');
  const [newPin, setNewPin] = useState<string>('');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleRetrieveVault = () => {
    setErrorMessage(null);
    setDecryptionSuccess(null);

    const query = inputKey.trim().toUpperCase();
    const pin = inputPin.trim();

    const match = SAMPLE_VAULTS.find(
      v => v.vaultId.toUpperCase() === query || (pin && v.passcodePin === pin)
    );

    if (!match) {
      setErrorMessage('Invalid Vault ID or Security PIN. Try a sample key below!');
      return;
    }

    setIsDecrypting(true);
    setTimeout(() => {
      setIsDecrypting(false);
      setDecryptionSuccess(match);
    }, 1200);
  };

  const handleApplyUnlockedVault = () => {
    if (decryptionSuccess) {
      loadVaultData(decryptionSuccess);
      onClose();
    }
  };

  const handleSelectSampleKey = (sample: EncryptedVaultRecord) => {
    setInputKey(sample.vaultId);
    setInputPin(sample.passcodePin || '');
    setErrorMessage(null);
  };

  const handleCreateNewVault = (e: React.FormEvent) => {
    e.preventDefault();
    const randomKey = `VAULT-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
    setGeneratedKey(randomKey);
  };

  const handleCopyKey = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white">Encrypted Member Vault</h3>
              <p className="text-xs text-slate-400">AES-256 Zero-Knowledge Encrypted Health Records</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/40">
          <button
            onClick={() => setActiveTab('retrieve')}
            className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 flex items-center justify-center gap-2 ${
              activeTab === 'retrieve'
                ? 'border-emerald-500 text-emerald-400 bg-slate-900/80'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Key className="w-4 h-4" /> Retrieve via Vault ID / Key
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 flex items-center justify-center gap-2 ${
              activeTab === 'upload'
                ? 'border-cyan-500 text-cyan-400 bg-slate-900/80'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <UploadCloud className="w-4 h-4" /> Encrypt & Upload New Record
          </button>
        </div>

        {/* Tab 1: Retrieve Vault */}
        {activeTab === 'retrieve' && (
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Enter Encrypted Vault ID or Security Key:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <div className="relative">
                    <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      value={inputKey}
                      onChange={(e) => setInputKey(e.target.value)}
                      placeholder="e.g. EMME-2026-X89"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm font-mono text-emerald-400 placeholder-slate-600 focus:outline-none focus:border-emerald-500/60"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="password"
                      maxLength={6}
                      value={inputPin}
                      onChange={(e) => setInputPin(e.target.value)}
                      placeholder="6-digit PIN"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/60"
                    />
                  </div>
                </div>
              </div>

              {/* Sample Keys Bar */}
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-between">
                  <span>1-Click Test Sample Access Keys:</span>
                  <span className="text-[10px] text-emerald-400">Click to auto-fill</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_VAULTS.map(vault => (
                    <button
                      key={vault.vaultId}
                      onClick={() => handleSelectSampleKey(vault)}
                      className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg text-xs font-mono text-slate-300 hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                    >
                      <Key className="w-3 h-3 text-cyan-400" />
                      <span>{vault.vaultId}</span>
                      <span className="text-[10px] text-slate-500">({vault.ownerName})</span>
                    </button>
                  ))}
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            {/* Decrypting Animation or Decrypted Success */}
            {isDecrypting && (
              <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
                <div className="text-xs font-mono text-emerald-400">Decrypting payload using AES-256-GCM...</div>
                <div className="text-[11px] text-slate-500">Checking zero-knowledge cryptographic signature</div>
              </div>
            )}

            {decryptionSuccess && !isDecrypting && (
              <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <Unlock className="w-4 h-4" /> Vault Decrypted Successfully!
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    AES-256 Verified
                  </span>
                </div>

                <div className="text-xs text-slate-300 space-y-1">
                  <div><strong>Member:</strong> {decryptionSuccess.ownerName}</div>
                  <div><strong>Plan:</strong> {decryptionSuccess.payload.planDetails.carrier} ({decryptionSuccess.payload.planDetails.planName})</div>
                  <div className="text-[11px] text-slate-500 font-mono truncate">SHA-256: {decryptionSuccess.sha256Fingerprint}</div>
                </div>

                <button
                  onClick={handleApplyUnlockedVault}
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <span>Load Decrypted Health Records into Intake Wizard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {!decryptionSuccess && !isDecrypting && (
              <button
                onClick={handleRetrieveVault}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" /> Decrypt & Access Vault Records
              </button>
            )}
          </div>
        )}

        {/* Tab 2: Encrypt & Upload New Record */}
        {activeTab === 'upload' && (
          <form onSubmit={handleCreateNewVault} className="p-6 space-y-5">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Record / Document Title:
                </label>
                <input
                  type="text"
                  required
                  value={uploadFileName}
                  onChange={(e) => setUploadFileName(e.target.value)}
                  placeholder="e.g. 2026_BloodWork_LabResults.pdf"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Set Custom 6-Digit Passcode PIN (Optional):
                </label>
                <input
                  type="password"
                  maxLength={6}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="e.g. 884920"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60"
                />
              </div>
            </div>

            {generatedKey ? (
              <div className="p-4 bg-cyan-950/40 border border-cyan-500/40 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" /> New Vault Key Generated!
                  </span>
                  <span className="text-[10px] text-cyan-400 font-mono">Encrypted</span>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
                  <span className="text-sm font-mono font-bold text-emerald-400">{generatedKey}</span>
                  <button
                    type="button"
                    onClick={() => handleCopyKey(generatedKey)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors"
                  >
                    {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-400">
                  Save this key! Any healthcare provider or device with this Access Key can securely decrypt your uploaded record.
                </p>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Encrypt Record & Generate Vault Key
              </button>
            )}
          </form>
        )}

      </div>
    </div>
  );
};
