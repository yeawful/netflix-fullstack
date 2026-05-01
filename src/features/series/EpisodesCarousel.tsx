'use client'

import { Episode } from '@/prisma/generated/prisma/client'
import useEmblaCarousel from 'embla-carousel-react'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
const DynamicProgressBar = dynamic(
	() => import('./ProgressBar').then(mod => mod.ProgressBar),
	{ ssr: false }
)

type TSeries = {
	posterUrl: string
	episodes: Episode[]
	slug: string
}

export function EpisodesCarousel({ series }: { series: TSeries }) {
	const [emblaRef] = useEmblaCarousel({ align: 'start' })
	const router = useRouter()
	const searchParams = useSearchParams()

	const openEpisode = (number: number) => {
		const params = new URLSearchParams(searchParams.toString())
		params.set('ep', String(number))
		router.push(`?${params.toString()}`, { scroll: false })
	}

	return (
		<section className="px-10 py-10 relative">
			<h2 className="mb-4 text-2xl font-semibold text-white">Episodes</h2>

			<div
				className="overflow-hidden"
				ref={emblaRef}
			>
				<div className="flex gap-4">
					{series.episodes.map(ep => (
						<div key={ep.id}>
							<button
								onClick={() => openEpisode(ep.number)}
								className="block relative w-92 aspect-video shrink-0 bg-neutral-800 cursor-pointer rounded-2xl overflow-hidden"
								style={{
									backgroundImage: `url(${ep.thumbnailUrl})`,
									backgroundSize: 'cover',
									backgroundPosition: 'center'
								}}
							>
								<div className="absolute inset-0 bg-black/40 " />

								<DynamicProgressBar
									ep={{ number: ep.number, durationSec: ep.durationSec }}
									series={{ slug: series.slug }}
								/>
							</button>
							<div className="text-white font-medium mt-1">{ep.title}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
