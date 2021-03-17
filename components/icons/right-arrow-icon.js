export default ({ width = 60, height = 20, small } = {}) => {
  if (small) {
    width = width / 1.5
    height = height / 1.5
  }
  return (
    <svg width={width} height={height} viewBox="0 0 64 28">
      <path
        d="m50.283 27.562c-.571.562-1.522.562-2.113 0-.57-.541-.57-1.446 0-1.987l10.71-10.178h-57.403c-.824-.001-1.479-.623-1.479-1.406s.655-1.426 1.479-1.426h57.403l-10.71-10.159c-.57-.561-.57-1.466 0-2.007.591-.562 1.544-.562 2.113 0l13.245 12.587c.591.543.591 1.446 0 1.987z"
        fill="currentColor"
      />
    </svg>
  )
}
