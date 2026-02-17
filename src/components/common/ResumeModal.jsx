import { useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { header } from '../../data/siteData';

const ResumeModal = ({ isOpen, onClose }) => {
  const resumeUrl = header.socials.find((item) => item.isResume)?.url;

  useEffect(() => {
    if (!isOpen) return undefined;

    const onEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="resume-overlay" onClick={onClose} role="presentation">
      <div className="resume-modal-shell" onClick={(event) => event.stopPropagation()} role="presentation">
        <div className="resume-topbar">
          <h3>Resume Preview</h3>
          <div className="resume-actions">
            <a href={resumeUrl} download="Mohan_Seetha_Resume.pdf" target="_blank" rel="noreferrer">
              <Download size={14} />
              Download
            </a>
            <button type="button" onClick={onClose} aria-label="Close resume modal">
              <X size={16} />
            </button>
          </div>
        </div>

        <iframe src={resumeUrl} title="Resume PDF" />
      </div>
    </div>
  );
};

export default ResumeModal;
