import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  fill?: string;
}

// 1. 3D View (Location Pin / Nav Marker)
export const Icon3DView: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
  </svg>
);

// 2. Fire (Flame with inner lick)
export const IconFire: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M13.5 0.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.61 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8c0-3.83-2.69-8.49-6.5-13.33zM12 20c-3.31 0-6-2.69-6-6 0-1.53.5-3.08 1.48-4.22.45 2.11 2.33 3.72 4.52 3.72 2.48 0 4.5-2.02 4.5-4.5 0-.49-.08-.96-.23-1.4 1.13 1.83 1.73 3.99 1.73 6.4 0 3.31-2.69 6-6 6z" />
  </svg>
);

// 3. Electric (High-Voltage Lightning Bolt)
export const IconElectric: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M11 21h-1l1-7H7.5c-.88 0-1.33-.97-.83-1.64L14 3h1l-1 7h3.5c.88 0 1.33.97.83 1.64L11 21z" />
  </svg>
);

// 4. Community (Cluster of 4 Nodes / People Group)
export const IconCommunity: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <circle cx="12" cy="7" r="2.8" />
    <circle cx="6.5" cy="14" r="2.3" />
    <circle cx="17.5" cy="14" r="2.3" />
    <circle cx="12" cy="18.5" r="2.5" />
    <path
      d="M12 9.8c-2.4 0-4.3 1.5-4.8 3.5h9.6c-.5-2-2.4-3.5-4.8-3.5z"
      opacity="0.6"
    />
  </svg>
);

// 5. Metering (Gauge / Speedometer with Needle)
export const IconMetering: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
    <path d="M12 12l4-4" strokeWidth="2.5" />
    <path d="M7 12a5 5 0 0 1 5-5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

// 6. Security (Shield with Verified Checkmark)
export const IconSecurity: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.5 13.5l-3.5-3.5 1.41-1.41 2.09 2.08 5.09-5.08 1.41 1.41-6.5 6.5z" />
  </svg>
);

// 7. Plumbing (Angled Wrench / Spanner)
export const IconPlumbing: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.6C.4 7 .8 10 2.8 12c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.5-2.5c.4-.4.4-1.1 0-1.1z" />
  </svg>
);

// 8. HVAC (4-Blade Centrifugal Fan / Propeller)
export const IconHVAC: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M12 10.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM12 2c.6 0 1 .4 1 1v4.06c1.45.36 2.66 1.34 3.32 2.64l3.52-2.03c.52-.3 1.17-.12 1.47.4.3.52.12 1.17-.4 1.47l-3.52 2.03c.18.72.24 1.48.16 2.24l3.86 1.25c.57.19.89.8.7 1.37-.18.55-.76.88-1.33.72l-3.86-1.25c-.71 1.32-1.89 2.34-3.32 2.8v3.9c0 .6-.4 1-1 1s-1-.4-1-1v-3.9c-1.43-.46-2.61-1.48-3.32-2.8l-3.86 1.25c-.57.16-1.15-.17-1.33-.72-.19-.57.13-1.18.7-1.37l3.86-1.25c-.08-.76-.02-1.52.16-2.24L3.64 9.54c-.52-.3-.7-.95-.4-1.47.3-.52.95-.7 1.47-.4l3.52 2.03c.66-1.3 1.87-2.28 3.32-2.64V3c0-.6.4-1 1-1z" />
  </svg>
);

// 9. Maintenance (6-Tooth Precision Mechanical Gear)
export const IconMaintenance: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

// 10. Card Header Expand / Elevator Icon
export const IconElevatorHeader: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M15 9l-6 6" />
    <path d="M9 9h6v6" />
  </svg>
);

// 11. Air Quality Header Icon
export const IconAirHeader: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M8 12h8" />
    <path d="M12 8v8" />
  </svg>
);

// 12. Calendar Header Icon
export const IconCalendarHeader: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <circle cx="8" cy="15" r="1" fill="currentColor" />
    <circle cx="12" cy="15" r="1" fill="currentColor" />
    <circle cx="16" cy="15" r="1" fill="currentColor" />
  </svg>
);

// 13. Power Shield Header Icon
export const IconPowerHeader: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

// 14. Sustainability Leaf Header Icon
export const IconLeafHeader: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-10 6" />
  </svg>
);

// 15. Header Clock Icon
export const IconClock: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// 16. Weather Cloud Icon
export const IconWeatherCloud: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
  </svg>
);

// 17. Notification Bell Icon
export const IconBell: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </svg>
);
