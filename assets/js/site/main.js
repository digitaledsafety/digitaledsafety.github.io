(function() {
    const googleAdsId = document.body.getAttribute('data-google-ads-id');
    const turnstileSitekey = document.body.getAttribute('data-turnstile-sitekey');
    const turnstileSitekeyMc = document.body.getAttribute('data-turnstile-sitekey-mc');

    // Event snippet for Submit lead form conversion page
    ['sendMessageButtonFoot', 'sendMessageButtonMc'].forEach(function(id) {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', function() {
                if (typeof gtag === 'function') {
                    gtag('event', 'conversion', {'send_to': googleAdsId + "/oNtiCNf78sAaEJfMq48_"});
                }
            });
        }
    });

    const paypalDonate = document.getElementById('paypalDonate');
    if (paypalDonate) {
        paypalDonate.addEventListener('click', function() {
            if (typeof gtag === 'function') {
                gtag('event', 'conversion', {'send_to': googleAdsId + "/oNtiCNf78sAaEJfMq48_"});
            }
        });
    }

    const paypalDonateLanding = document.getElementById('paypalDonateLanding');
    if (paypalDonateLanding) {
        paypalDonateLanding.addEventListener('click', function() {
            if (typeof gtag === 'function') {
                gtag('event', 'conversion', {'send_to': googleAdsId + "/oNtiCNf78sAaEJfMq48_"});
            }
        });
    }

    // Turnstile
    if (document.getElementById("turnstile-container") && typeof turnstile !== 'undefined') {
        const footButton = document.getElementById("sendMessageButtonFoot");
        if (footButton) footButton.disabled = true;
        turnstile.render("#turnstile-container", {
            sitekey: turnstileSitekey,
            callback: function (token) {
                console.log("Success:", token);
                if (footButton) footButton.disabled = false;
            },
        });
    }

    if (document.getElementById("turnstile-container-mc") && typeof turnstile !== 'undefined') {
        const mcButton = document.getElementById("sendMessageButtonMc");
        if (mcButton) mcButton.disabled = true;
        turnstile.render("#turnstile-container-mc", {
            sitekey: turnstileSitekeyMc,
            callback: function (token) {
                console.log("Success:", token);
                if (mcButton) mcButton.disabled = false;
            },
        });
    }

    // Scroll Depth and Time on Page Tracking
    if (document.body.classList.contains('landing-page')) {
        var scrollMarkers = [25, 50, 75, 100];
        var markersReached = [];
        window.addEventListener('scroll', function() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var scrollPercent = (scrollTop / scrollHeight) * 100;

            scrollMarkers.forEach(function(marker) {
                if (scrollPercent >= marker && markersReached.indexOf(marker) === -1) {
                    markersReached.push(marker);
                    if (typeof gtag === 'function') {
                        gtag('event', 'scroll_depth', {
                            'event_category': 'Engagement',
                            'event_label': marker + '%',
                            'value': marker
                        });
                    }
                }
            });
        });

        var timeMarkers = [30, 60, 120, 180];
        timeMarkers.forEach(function(seconds) {
            setTimeout(function() {
                if (typeof gtag === 'function') {
                    gtag('event', 'time_on_page', {
                        'event_category': 'Engagement',
                        'event_label': seconds + 's',
                        'value': seconds
                    });
                }
            }, seconds * 1000);
        });

        // A/B Testing Script for Hero CTA
        const variantsData = document.body.getAttribute('data-cta-variants');
        if (variantsData) {
            const variants = JSON.parse(variantsData);
            let variant = sessionStorage.getItem('lp_cta_variant');
            if (!variant) {
                variant = variants[Math.floor(Math.random() * variants.length)];
                sessionStorage.setItem('lp_cta_variant', variant);
            }

            const ctaBtn = document.querySelector('.hero-cta');
            if (ctaBtn) {
                ctaBtn.textContent = variant;
                if (typeof gtag === 'function') {
                    gtag('event', 'ab_test_exposure', {
                        'event_category': 'A/B Test',
                        'event_label': 'Hero CTA: ' + variant
                    });
                }
            }
        }
    }
})();
