// import { fromEvent, Observable } from 'rxjs';
// import { ScrollPosition } from './interfaces/iType';
// import { Directive, AfterViewInit, ElementRef, Input } from '@angular/core';
// import { DEFAULT_SCROLL_POSITION } from './utils/constant';
// import { map, filter, pairwise, startWith, exhaustMap } from 'rxjs/operators';

// @Directive({
//     selector: '[InfiniteScroller]'
// })
// export class InfiniteScrollerDirective implements AfterViewInit {

//     private scrollEvent$: Observable<any>;
//     private userScrolledDown$: Observable<any>;
//     private requestOnScroll$: Observable<any>;

//     @Input()
//     scrollCallback;

//     @Input()
//     immediateCallback;

//     @Input()
//     scrollPercent = 70;

//     constructor(
//         private _elm: ElementRef
//     ) { }

//     ngAfterViewInit() {
//         this._registerScrollEvent();
//         this._streamScrollEvents();
//         this._requestCallbackOnScroll();
//     }

//     private _registerScrollEvent() {

//         this.scrollEvent$ = fromEvent(this._elm.nativeElement, 'scroll');

//     }

//     private _streamScrollEvents() {
//         this.userScrolledDown$ = this.scrollEvent$.pipe(
//             map((e: any): ScrollPosition => ({
//                 scrHeight: e.target.scrollHeight,
//                 scrTop: e.target.scrollTop,
//                 clientHeight: e.target.clientHeight
//             })),
//             pairwise(),
//             filter(positions => this._isUserScrollingDown(positions) && this._isScrollExpectedPercent(positions[1]))
//         )
//     }

//     private _requestCallbackOnScroll() {
//         this.requestOnScroll$ = this.userScrolledDown$;
//         if (this.immediateCallback) {
//             this.requestOnScroll$ = this.requestOnScroll$.pipe(
//                 startWith([DEFAULT_SCROLL_POSITION, DEFAULT_SCROLL_POSITION])
//             )
//         }

//         this.requestOnScroll$.pipe(
//             exhaustMap((res) => {
//                 console.log("res" + res);
//                 return this.scrollCallback;
//             })
//         ).subscribe(s => console.log("s" + s));
//     }

//     private _isUserScrollingDown = (positions) => {
//         return positions[0].scrTop < positions[1].scrTop;
//     }

//     private _isScrollExpectedPercent = (position) => {
//         return ((position.scrTop + position.clientHeight) / position.scrHeight) > (this.scrollPercent / 100);
//     }

// }