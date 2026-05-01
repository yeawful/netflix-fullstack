import { Badge } from '@/components/ui-shadcn/badge'
import { Button } from '@/components/ui-shadcn/button'
import { Episode, Genre, Series } from '@/prisma/generated/prisma/client'
import { Info, Play } from 'lucide-react'

type TProps = {
	series: Series & {
		genres: Genre[]
		episodes: Episode[]
	}
}

export function SeriesMain({ series }: TProps) {
	return (
		<section className="relative h-[60vh] w-full">
			<div className="absolute bottom-16 left-10 max-w-xl">
				<h1 className="text-6xl font-bold mb-2">{series.title}</h1>
				<div className="flex items-center gap-4 text-lg">
					<span>{series.genres.map(g => g.name).join(', ')}</span>
					<span>{series.episodes.length} Episodes</span>
				</div>

				<div className="flex items-center gap-2">
					<Badge
						className="mt-4"
						variant="secondary"
					>
						{series.year}
					</Badge>

					<Badge
						className="mt-4"
						variant="secondary"
					>
						{series.ratingAge}
					</Badge>
				</div>

				<p className="text-neutral-400 mt-5 max-w-sm text-lg">
					{series.description}
				</p>

				<div className="flex items-center gap-4 mt-6">
					<Button
						size="lg"
						className="rounded-3xl"
					>
						<Play fill="black" />
						Watch Now
					</Button>
					<Button
						size="lg"
						variant="secondary"
						className="rounded-3xl"
					>
						More Info
						<Info />
					</Button>
				</div>
			</div>
		</section>
	)
}
