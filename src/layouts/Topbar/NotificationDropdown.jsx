import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Dropdown } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import classNames from 'classnames';
import { useToggle } from '@/hooks';
import { useNotifications } from '@/common/context/useNotificationContext';

const NotificationDropdown = () => {
  const { notifications, markAsRead } = useNotifications(); // ✅ se importa markAsRead
  const [isOpen, toggleDropdown] = useToggle();
//  const navigate = useNavigate();

  const notificationShowContainerStyle = {
    maxHeight: '300px',
  };

  const hasUnread = notifications.some((group) =>
    group.messages?.some((msg) => !msg.isRead)
  );

  return (
    <Dropdown show={isOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        variant="link"
        id="dropdown-notification"
        onClick={toggleDropdown}
        className="nav-link dropdown-toggle arrow-none"
      >
        <i
          className={classNames(
            'ri-notification-3-line font-22',
            hasUnread && 'text-danger'
          )}
        ></i>
        <span className="noti-icon-badge"></span>
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu-animated dropdown-lg" align="end">
        <div onClick={toggleDropdown}>
          <div className="dropdown-item noti-title px-3">
            <h5 className="m-0">
              <span className="float-end">
                <Link to="/notifications" className="text-dark">
                  <small>Clear All</small>
                </Link>
              </span>
              Notification
            </h5>
          </div>

          <SimpleBar className="px-3" style={notificationShowContainerStyle}>
            {notifications.map((item, index) => (
              <React.Fragment key={index}>
                <h5 className="text-muted font-13 fw-normal mt-0">{item.day}</h5>
                {(item.messages || []).map((message, i) => (
                  <Dropdown.Item
                    key={`${index}-${i}`}
                    className={classNames(
                      'p-0 notify-item card shadow-none mb-2',
                      message.isRead ? 'read-noti' : 'unread-noti'
                    )}
                    onClick={() => {
                      markAsRead(message.id); // ✅ marcar como leído
                       onSelectMessage(message); // ✅ mostrar mensaje en panel lateral
                    }}
                  >
                    <Card.Body>
                      <span className="float-end noti-close-btn text-muted">
                        <i className="mdi mdi-close"></i>
                      </span>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <div
                            className={classNames(
                              'notify-icon',
                              message.variant && `bg-${message.variant}`
                            )}
                          >
                            {message.avatar ? (
                              <img
                                src={message.avatar}
                                className="img-fluid rounded-circle"
                                alt=""
                              />
                            ) : (
                              <i className={message.icon}></i>
                            )}
                          </div>
                        </div>
                        <div className="flex-grow-1 text-truncate ms-2">
                          <h5 className="noti-item-title fw-semibold font-14">
                            {message.title}
                            {message.time && (
                              <small className="fw-normal text-muted ms-1">
                                {message.time}
                              </small>
                            )}
                          </h5>
                          <small className="noti-item-subtitle text-muted">
                            {message.subText}
                          </small>
                        </div>
                      </div>
                    </Card.Body>
                  </Dropdown.Item>
                ))}
              </React.Fragment>
            ))}

            <div className="text-center">
              <i className="mdi mdi-dots-circle mdi-spin text-muted h3 mt-0"></i>
            </div>
          </SimpleBar>

          <Dropdown.Item className="text-center text-primary notify-item border-top border-light py-2">
            View All
          </Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationDropdown;
