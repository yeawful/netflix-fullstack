export function ProgressBar({
	ep,
	series
}: {
	ep: { number: number; durationSec: number }
	series: { slug: string }
}) {
	const getEpisodeProgress = (epNumber: number, duration: number) => {
		const key = `progress:${series.slug}:${epNumber}`

		if (typeof window === 'undefined') return 0

		const savedTime = localStorage.getItem(key)

		if (!savedTime) return 0

		return Number(savedTime)
	}

	return (
		<div
			className="absolute bottom-1 left-1 h-1 bg-white/60 rounded-full"
			style={{
				width: 'calc(100% - 0.7rem)'
			}}
		>
			{getEpisodeProgress(ep.number, ep.durationSec) > 0 && (
				<div
					className="absolute bottom-0 left-0 w-0 h-full bg-red-600 rounded-full"
					style={{
						width: `${getEpisodeProgress(ep.number, ep.durationSec)}%`
					}}
				/>
			)}
		</div>
	)
}
