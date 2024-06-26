import { projectDialog, closeDialog } from "@/lib/state/project-dialog";
import EmergentDialog, { DialogOpenMode } from "./EmergentDialog";
import { type JSX, createEffect, createSignal } from "solid-js";
import ProjectMedia from "./ProjectMedia";

const [opened, setOpened] = createSignal<
	| {
		id: string | null;
		lastImage?: Element;
	}
	| undefined
>(undefined);

createEffect<{ id: string; image: Element } | null>((prev) => {
	const current = projectDialog();
	setOpened(() => ({
		id: current?.id ?? null,
		lastImage: current?.image ?? prev?.image,
	}));

	return current;
}, null);

export default function ProjectDialog({
	projectId,
	image,
	video,
	children,
	name,
	containerClass,
	openMode,
}: {
	projectId: string;
	image?: string;
	video?: string;
	children: JSX.Element;
	name: string;
	containerClass?: string;
	openMode: DialogOpenMode;
}) {

	return (
		<EmergentDialog
			onClose={closeDialog}
			image={
				<ProjectMedia id={projectId} name={name} image={image} video={video} />
			}
			fromImage={() => opened()?.lastImage}
			opened={() => opened()?.id === projectId}
			containerClass={containerClass}
			openMode={openMode}
		>
			{children}
		</EmergentDialog>
	);
}
