import { Directive, ElementRef, inject } from '@angular/core';

import { IframeParentService } from './iframe-parent.service';

/**
 * Keep logic in directive minimal and only view-related. Globally manage interactions with iframe in IframeParentService.
 */
@Directive({
    standalone: true,
    selector: `iframe[parentIframe]`,
})
export class IframeParentDirective {
    elementRef: ElementRef<HTMLIFrameElement> = inject(ElementRef);
    parentService = inject(IframeParentService);

    ngOnInit() {
        this.parentService.registerIframe(this.elementRef.nativeElement);

        this.elementRef.nativeElement.onload = (event: Event) => {
            const target: (EventTarget & { src?: string }) | null = event.target as any;
            if (!target?.src) {
                return;
            }

            this.parentService.status$.next(`loaded`);
        };
    }

    ngOnDestroy() {
        this.parentService.status$.next(`unloaded`);
    }
}
