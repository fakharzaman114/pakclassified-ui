import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { AuthService } from '../../core/services/authServices/auth.service';
import Swal from 'sweetalert2';

// Define slide interface
interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  overlayColor: string;
}

@Component({
  selector: 'app-carousal',
  imports: [CommonModule],
  templateUrl: './carousal.component.html',
  styleUrl: './carousal.component.css',
})
export class CarousalComponent implements AfterViewInit, OnDestroy {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  private authService = inject(AuthService);
  private router = inject(Router);

  slides: Slide[] = [
    {
      id: 1,
      title: 'Your Next Ride Awaits',
      subtitle: 'Cars for Every Lifestyle',
      description:
        'Browse a wide selection of cars, from budget-friendly to premium models.',
      buttonText: 'Post Advertisement',
      buttonLink: '/cars',
      imageUrl: 'carousal/vehicle-1.jfif',
      overlayColor: '#ffffff',
    },
    {
      id: 2,
      title: 'Find Your Dream Property',
      subtitle: 'Properties for Every Lifestyle',
      description:
        'Explore properties including houses, apartments, and commercial plots.',
      buttonText: 'Post Advertisement',
      buttonLink: '/properties',
      imageUrl: 'carousal/real-estate-1.jpg',
      overlayColor: '#ffffff',
    },
    {
      id: 3,
      title: 'Gadgets for Every Day',
      subtitle: 'Everything Electronics in One Place',
      description:
        'Find mobiles, laptops, headphones, chargers, and household electronics.',
      buttonText: 'Post Advertisement',
      buttonLink: '/electronics',
      imageUrl: 'carousal/electronic-1.jfif',
      overlayColor: '#ffffff',
    },
  ];

  private swiperInstance: Swiper | null = null;
  public isAutoplayActive = true;

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  ngAfterViewInit(): void {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      this.initializeSwiper();
    }, 100);
  }

  private initializeSwiper(): void {
    // Register required Swiper modules
    Swiper.use([Navigation, Pagination, Autoplay, EffectFade]);

    // Initialize Swiper
    this.swiperInstance = new Swiper(this.swiperContainer.nativeElement, {
      // Basic configuration
      direction: 'horizontal',
      loop: true,
      speed: 800,

      // Start with first slide
      initialSlide: 0,

      // Autoplay
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        stopOnLastSlide: false,
      },

      // Pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },

      // Navigation
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // Fade effect
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },

      // Important: Single slide view
      slidesPerView: 1,
      spaceBetween: 0,

      // Center slide
      centeredSlides: true,

      // Enable all interactions
      allowTouchMove: true,
      simulateTouch: true,
    });

    // Start autoplay
    setTimeout(() => {
      if (this.swiperInstance && this.isAutoplayActive) {
        this.swiperInstance.autoplay.start();
      }
    }, 200);
  }

  onButtonClick(slide: Slide): void {
    // Check if user is logged in
    if (!this.isLoggedIn()) {
      this.showLoginRequiredModal();
    } else {
      // Navigate to post advertisement page
      this.router.navigate(['/post-advertisement']);
    }
  }

  private showLoginRequiredModal(): void {
    Swal.fire({
      title: 'Login Required',
      html: `<p>You need to login first to post an advertisement.</p>`,
      icon: 'warning',
      iconColor: '#f4c542',

      confirmButtonText: 'Login Now',
      cancelButtonText: 'Cancel',
      showCancelButton: true,

      // custom classes
      customClass: {
        confirmButton: 'login-confirm-btn',
        cancelButton: 'login-cancel-btn',
        popup: 'login-swal-popup',
      },

      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/signin']);
      }
    });
  }

  // Public methods to control the carousal
  nextSlide(): void {
    if (this.swiperInstance) {
      this.swiperInstance.slideNext();
    }
  }

  prevSlide(): void {
    if (this.swiperInstance) {
      this.swiperInstance.slidePrev();
    }
  }

  toggleAutoplay(): void {
    if (this.swiperInstance) {
      if (this.isAutoplayActive) {
        this.swiperInstance.autoplay.stop();
        this.isAutoplayActive = false;
      } else {
        this.swiperInstance.autoplay.start();
        this.isAutoplayActive = true;
      }
    }
  }

  ngOnDestroy(): void {
    if (this.swiperInstance) {
      this.swiperInstance.destroy();
      this.swiperInstance = null;
    }
  }
}
