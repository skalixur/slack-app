export const ChatSidebarUserInfo = ({ id, email }) => (
  <span className="flex items-start gap-2">
    <span className="tabular-nums text-sidebar-foreground/70">{id}</span>
    <span className="truncate">{email}</span>
  </span>
);

