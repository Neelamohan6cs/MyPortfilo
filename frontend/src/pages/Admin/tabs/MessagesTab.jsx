import React from 'react';
import './MessagesTab.css';

export default function MessagesTab({ data }) {
  return (
    <div>
      <h2 className="tab-heading">
        Contact Messages ({(data || []).length})
      </h2>

      <div className="msgs-list">
        {(data || []).length === 0 && (
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
            No messages yet.
          </p>
        )}

        {(data || []).map((msg) => {
          const gmailLink = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(
            msg.email
          )}&su=${encodeURIComponent(
            "Re: Your Message"
          )}&body=${encodeURIComponent(
            `Hi ${msg.name},

Your message:
${msg.message}

My reply:
`
          )}`;

          return (
            <div key={msg.id} className="msg-card">
              <div className="msg-top">
                <span className="msg-name">{msg.name}</span>
                <span className="msg-email">{msg.email}</span>
                <span className="msg-date">
                  {new Date(msg.sent_at).toLocaleDateString('en-IN')}
                </span>
              </div>

              <p className="msg-body">{msg.message}</p>

              {/* ✅ Updated Reply Button */}
              <a
                href={gmailLink}
                target="_blank"
                rel="noreferrer"
                className="reply-btn"
              >
                Reply
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
