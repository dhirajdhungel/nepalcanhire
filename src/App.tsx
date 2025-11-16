import { useState, useEffect } from 'react';

interface Star {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
}

export default function App() {
  const [stars, setStars] = useState<Star[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  // Generate random stars on mount
  useEffect(() => {
    const generatedStars: Star[] = [];
    for (let i = 0; i < 150; i++) {
      generatedStars.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2
      });
    }
    setStars(generatedStars);
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);


    try {
      const response = await fetch('https://formspree.io/f/xrbroevl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
          _subject: 'Domain Purchase Inquiry from nepalcansell.com',
          _to: 'hantakalidhoti@gmail.com',
          _from: 'domain@nepalcansell.com'
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      const subject = encodeURIComponent('Domain Purchase Inquiry');
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
      );
      window.location.href = `mailto:hantakalidhoti@gmail.com?subject=${subject}&body=${body}`;
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ 
      fontFamily: "'Roboto', sans-serif",
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#10002b',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
      
      {/* Animated Starry Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        background: 'radial-gradient(ellipse at bottom, #240046 0%, #10002b 100%)'
      }}>
        {stars.map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              position: 'absolute',
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: '#e0aaff',
              borderRadius: '50%',
              boxShadow: `0 0 ${star.size * 2}px ${star.size / 2}px rgba(224, 170, 255, 0.3)`,
              animation: `twinkle ${star.duration}s infinite ${star.delay}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <section style={{
          padding: '6rem 2rem 4rem',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <h1 style={{
              fontSize: '4rem',
              margin: '0 0 1.5rem 0',
              color: '#e0aaff',
              lineHeight: '1.2',
              fontWeight: '700',
              textShadow: '0 0 40px rgba(224, 170, 255, 0.5), 0 0 80px rgba(157, 78, 221, 0.3)',
              letterSpacing: '-0.02em'
            }}>
              This Domain is Available for Purchase
            </h1>
            <p style={{
              fontSize: '1.5rem',
              color: '#c77dff',
              margin: '0',
              fontWeight: '300',
              lineHeight: '1.6'
            }}>
              If you're interested in buying this domain, get in touch with us today.
            </p>
          </div>
        </section>

        {/* Contact Button Section */}
        <section style={{
          padding: '3rem 2rem',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <a
              href="mailto:hantakalidhoti@gmail.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                backgroundColor: 'rgba(157, 78, 221, 0.2)',
                color: '#e0aaff',
                padding: '1.25rem 3rem',
                textDecoration: 'none',
                borderRadius: '50px',
                fontSize: '1.25rem',
                fontWeight: '500',
                transition: 'all 0.3s',
                cursor: 'pointer',
                border: '2px solid rgba(157, 78, 221, 0.5)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(157, 78, 221, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(157, 78, 221, 0.3)';
                e.currentTarget.style.borderColor = '#9d4edd';
                e.currentTarget.style.boxShadow = '0 12px 48px rgba(157, 78, 221, 0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(157, 78, 221, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(157, 78, 221, 0.5)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(157, 78, 221, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              Contact Us via Email
            </a>
          </div>
        </section>

        {/* Contact Form Section */}
        <section style={{
          padding: '4rem 2rem 6rem'
        }}>
          <div style={{
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <h3 style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              color: '#e0aaff',
              textAlign: 'center',
              fontWeight: '600',
              textShadow: '0 0 30px rgba(224, 170, 255, 0.3)'
            }}>
              Send Us a Message
            </h3>
            <p style={{
              textAlign: 'center',
              color: '#c77dff',
              marginBottom: '3rem',
              fontSize: '1.125rem',
              fontWeight: '300'
            }}>
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            {submitStatus === 'success' && (
              <div style={{
                backgroundColor: 'rgba(157, 78, 221, 0.2)',
                border: '1px solid rgba(157, 78, 221, 0.5)',
                color: '#e0aaff',
                padding: '1rem',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                textAlign: 'center',
                backdropFilter: 'blur(10px)'
              }}>
                Thank you! Your message has been sent successfully.
              </div>
            )}

            {submitStatus === 'error' && (
              <div style={{
                backgroundColor: 'rgba(199, 125, 255, 0.15)',
                border: '1px solid rgba(199, 125, 255, 0.4)',
                color: '#e0aaff',
                padding: '1rem',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                textAlign: 'center',
                backdropFilter: 'blur(10px)'
              }}>
                Your default email client should open. If not, please email us directly at hantakalidhoti@gmail.com
              </div>
            )}

            <form onSubmit={handleSubmit} style={{
              backgroundColor: 'rgba(36, 0, 70, 0.4)',
              padding: '2.5rem',
              borderRadius: '20px',
              border: '1px solid rgba(157, 78, 221, 0.3)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              <div style={{ marginBottom: '1.75rem' }}>
                <label htmlFor="name" style={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  color: '#e0aaff',
                  fontWeight: '500',
                  fontSize: '1rem'
                }}>
                  Name <span style={{ color: '#c77dff' }}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: 'rgba(16, 0, 43, 0.6)',
                    border: errors.name ? '2px solid #c77dff' : '1px solid rgba(157, 78, 221, 0.4)',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                    outline: 'none',
                    transition: 'all 0.3s',
                    color: '#e0aaff'
                  }}
                  onFocus={(e) => {
                    if (!errors.name) {
                      e.currentTarget.style.borderColor = '#9d4edd';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(157, 78, 221, 0.1)';
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.name) {
                      e.currentTarget.style.borderColor = 'rgba(157, 78, 221, 0.4)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                />
                {errors.name && (
                  <p style={{ color: '#c77dff', fontSize: '0.875rem', marginTop: '0.5rem', marginBottom: 0 }}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div style={{ marginBottom: '1.75rem' }}>
                <label htmlFor="email" style={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  color: '#e0aaff',
                  fontWeight: '500',
                  fontSize: '1rem'
                }}>
                  Email <span style={{ color: '#c77dff' }}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: 'rgba(16, 0, 43, 0.6)',
                    border: errors.email ? '2px solid #c77dff' : '1px solid rgba(157, 78, 221, 0.4)',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                    outline: 'none',
                    transition: 'all 0.3s',
                    color: '#e0aaff'
                  }}
                  onFocus={(e) => {
                    if (!errors.email) {
                      e.currentTarget.style.borderColor = '#9d4edd';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(157, 78, 221, 0.1)';
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.email) {
                      e.currentTarget.style.borderColor = 'rgba(157, 78, 221, 0.4)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                />
                {errors.email && (
                  <p style={{ color: '#c77dff', fontSize: '0.875rem', marginTop: '0.5rem', marginBottom: 0 }}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label htmlFor="message" style={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  color: '#e0aaff',
                  fontWeight: '500',
                  fontSize: '1rem'
                }}>
                  Message <span style={{ color: '#c77dff' }}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Tell us why you're interested in this domain..."
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: 'rgba(16, 0, 43, 0.6)',
                    border: errors.message ? '2px solid #c77dff' : '1px solid rgba(157, 78, 221, 0.4)',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                    outline: 'none',
                    transition: 'all 0.3s',
                    fontFamily: "'Roboto', sans-serif",
                    resize: 'vertical',
                    color: '#e0aaff'
                  }}
                  onFocus={(e) => {
                    if (!errors.message) {
                      e.currentTarget.style.borderColor = '#9d4edd';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(157, 78, 221, 0.1)';
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.message) {
                      e.currentTarget.style.borderColor = 'rgba(157, 78, 221, 0.4)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                />
                {errors.message && (
                  <p style={{ color: '#c77dff', fontSize: '0.875rem', marginTop: '0.5rem', marginBottom: 0 }}>
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  backgroundColor: isSubmitting ? 'rgba(157, 78, 221, 0.3)' : 'rgba(157, 78, 221, 0.4)',
                  color: '#e0aaff',
                  padding: '1.25rem',
                  border: '2px solid',
                  borderColor: isSubmitting ? 'rgba(157, 78, 221, 0.4)' : '#9d4edd',
                  borderRadius: '12px',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  backdropFilter: 'blur(10px)',
                  boxShadow: isSubmitting ? 'none' : '0 4px 20px rgba(157, 78, 221, 0.3)'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = 'rgba(157, 78, 221, 0.6)';
                    e.currentTarget.style.boxShadow = '0 6px 30px rgba(157, 78, 221, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = 'rgba(157, 78, 221, 0.4)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(157, 78, 221, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'rgba(16, 0, 43, 0.8)',
        borderTop: '1px solid rgba(157, 78, 221, 0.2)',
        color: '#c77dff',
        padding: '2rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '300' }}>
            Contact us at{' '}
            <a 
              href="mailto:hantakalidhoti@gmail.com" 
              style={{ 
                color: '#e0aaff', 
                textDecoration: 'none',
                borderBottom: '1px solid rgba(224, 170, 255, 0.5)',
                transition: 'all 0.3s'
              }}
            >
              hantakalidhoti@gmail.com
            </a>
          </p>
          <p style={{ margin: '0.5rem 0 0 0', color: '#9d4edd', fontSize: '0.875rem' }}>
            All rights reserved.
          </p>
        </div>
      </footer>

      {/* Styles */}
      <style>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        input::placeholder,
        textarea::placeholder {
          color: rgba(157, 78, 221, 0.5);
        }
        
        @media (max-width: 768px) {
          section:first-of-type h1 {
            font-size: 2.5rem !important;
            padding: 0 1rem;
          }
          
          section:first-of-type p {
            font-size: 1.125rem !important;
            padding: 0 1rem;
          }
          
          section:nth-of-type(3) h3 {
            font-size: 2rem !important;
          }
          
          form {
            padding: 1.75rem !important;
          }
        }
        
        @media (max-width: 480px) {
          section:first-of-type {
            padding: 4rem 1rem 3rem !important;
          }
          
          section:first-of-type h1 {
            font-size: 2rem !important;
          }
          
          section:first-of-type p {
            font-size: 1rem !important;
          }
          
          a[href^="mailto"] {
            padding: 1rem 2rem !important;
            font-size: 1.125rem !important;
          }
          
          form {
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
