---

---

<div id='product-component-1680265886705'></div>
<script type="text/javascript">
/*<![CDATA[*/
(function () {
  var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  if (window.ShopifyBuy) {
    if (window.ShopifyBuy.UI) {
      ShopifyBuyInit();
    } else {
      loadScript();
    }
  } else {
    loadScript();
  }
  function loadScript() {
    var script = document.createElement('script');
    script.async = true;
    script.src = scriptURL;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    script.onload = ShopifyBuyInit;
  }
  function ShopifyBuyInit() {
    var client = ShopifyBuy.buildClient({
      domain: 'brag-charity.myshopify.com',
      storefrontAccessToken: '240903ca2041182349ee2f3951e4f625',
    });
    ShopifyBuy.UI.onReady(client).then(function (ui) {
      ui.createComponent('product', {
        id: '8089358467323',
        node: document.getElementById('product-component-1680265886705'),
        moneyFormat: '%24%7B%7Bamount%7D%7D',
        options: {
  "product": {
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "calc(25% - 20px)",
          "margin-left": "20px",
          "margin-bottom": "50px"
        }
      },
      "button": {
        "font-family": "Arial, sans-serif",
        ":hover": {
          "background-color": "#4ab951"
        },
        "background-color": "#52ce5a",
        ":focus": {
          "background-color": "#4ab951"
        }
      }
    },
    "buttonDestination": "checkout",
    "text": {
      "button": "Buy now"
    }
  },
  "productSet": {
    "styles": {
      "products": {
        "@media (min-width: 601px)": {
          "margin-left": "-20px"
        }
      }
    }
  },
  "modalProduct": {
    "contents": {
      "img": false,
      "imgWithCarousel": true,
      "button": false,
      "buttonWithQuantity": true
    },
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "100%",
          "margin-left": "0px",
          "margin-bottom": "0px"
        }
      },
      "button": {
        "font-family": "Arial, sans-serif",
        ":hover": {
          "background-color": "#4ab951"
        },
        "background-color": "#52ce5a",
        ":focus": {
          "background-color": "#4ab951"
        }
      }
    },
    "text": {
      "button": "Add to cart"
    }
  },
  "option": {},
  "cart": {
    "styles": {
      "button": {
        "font-family": "Arial, sans-serif",
        ":hover": {
          "background-color": "#4ab951"
        },
        "background-color": "#52ce5a",
        ":focus": {
          "background-color": "#4ab951"
        }
      }
    },
    "text": {
      "total": "Subtotal",
      "button": "Checkout"
    }
  },
  "toggle": {
    "styles": {
      "toggle": {
        "font-family": "Arial, sans-serif",
        "background-color": "#52ce5a",
        ":hover": {
          "background-color": "#4ab951"
        },
        ":focus": {
          "background-color": "#4ab951"
        }
      }
    }
  }
},
      });
    });
  }
})();
/*]]>*/
</script>