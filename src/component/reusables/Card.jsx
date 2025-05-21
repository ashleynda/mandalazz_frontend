import React from 'react';

// interface CardProps {
//   cardWidth?: string;
//   cardHeight?: string;
//   bg?: string;
//   defaultHeaderImage?: string;
//   defaultTitle?: string;
//   defaultSubtitle?: string;
//   defaultContent?: string;
//   borderRadius?: string;
// }

const Card = ({
  cardWidth = '25rem',
  cardHeight = 'auto',
  bg = 'white',
  defaultHeaderImage = 'https://primefaces.org/cdn/primevue/images/usercard.png',
  defaultTitle = 'Default Title',
  defaultSubtitle = 'Default Subtitle',
  defaultContent = 'This is default card content. Replace it by using the content slot.',
  borderRadius = '0.5rem',
  children,
}) => {
  return (
    <div
      style={{
        width: cardWidth,
        height: cardHeight,
        backgroundColor: bg,
        borderRadius: borderRadius,
        overflow: 'hidden',
      }}
      className="card-container"
    >
      {/* Header Slot */}
      <div className="card-header">
        {children?.header ? (
          children.header
        ) : (
          <img alt="card header" src={defaultHeaderImage} />
        )}
      </div>

      {/* Title Slot */}
      <div className="card-title">
        {children?.title ? children.title : defaultTitle}
      </div>

      {/* Subtitle Slot */}
      <div className="card-subtitle">
        {children?.subtitle ? children.subtitle : defaultSubtitle}
      </div>

      {/* Content Slot */}
      <div className="card-content">
        {children?.content ? children.content : <p className="m-0">{defaultContent}</p>}
      </div>

      {/* Footer Slot */}
      <div className="card-footer">
        {children?.footer ? (
          children.footer
        ) : (
          <div className="flex gap-4 mt-1">
            <button className="w-full border-2 border-gray-400 p-2 rounded-md">
              Cancel
            </button>
            <button className="w-full bg-blue-500 text-white p-2 rounded-md">
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
