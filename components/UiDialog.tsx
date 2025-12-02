"use client";
import * as Dialog from "@radix-ui/react-dialog";


export default function UiDialog() {
return (
<Dialog.Root>
<Dialog.Trigger asChild>
<button className="rounded-lg px-3 py-1.5 text-sm text-white/80 ring-1 ring-white/15 hover:bg-white/10">Acerca de</button>
</Dialog.Trigger>
<Dialog.Portal>
<Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
<Dialog.Content className="glass-card fixed left-1/2 top-1/2 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2">
<Dialog.Title className="text-lg font-semibold">Bechapra Glass Starter</Dialog.Title>
<Dialog.Description className="mt-1 text-sm text-white/70">
Esqueleto base para landing 3D con Next.js, Tailwind, Framer Motion, GSAP y R3F.
</Dialog.Description>
<div className="mt-4 flex justify-end">
<Dialog.Close asChild>
<button className="glass-btn">Cerrar</button>
</Dialog.Close>
</div>
</Dialog.Content>
</Dialog.Portal>
</Dialog.Root>
);
}