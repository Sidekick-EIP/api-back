'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">back documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AlgoMatchingModule.html" data-type="entity-link" >AlgoMatchingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AlgoMatchingModule-461cc164ddbb0d7bc1ed11a2db7fff07f4a3cc7d66fd3af84c58c8b82f97dcfb6e662ad0820535e419db5f534a7b41558aee3aaf793b43a1b63f3dc47ad35394"' : 'data-bs-target="#xs-controllers-links-module-AlgoMatchingModule-461cc164ddbb0d7bc1ed11a2db7fff07f4a3cc7d66fd3af84c58c8b82f97dcfb6e662ad0820535e419db5f534a7b41558aee3aaf793b43a1b63f3dc47ad35394"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AlgoMatchingModule-461cc164ddbb0d7bc1ed11a2db7fff07f4a3cc7d66fd3af84c58c8b82f97dcfb6e662ad0820535e419db5f534a7b41558aee3aaf793b43a1b63f3dc47ad35394"' :
                                            'id="xs-controllers-links-module-AlgoMatchingModule-461cc164ddbb0d7bc1ed11a2db7fff07f4a3cc7d66fd3af84c58c8b82f97dcfb6e662ad0820535e419db5f534a7b41558aee3aaf793b43a1b63f3dc47ad35394"' }>
                                            <li class="link">
                                                <a href="controllers/AlgoMatchingController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlgoMatchingController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AlgoMatchingModule-461cc164ddbb0d7bc1ed11a2db7fff07f4a3cc7d66fd3af84c58c8b82f97dcfb6e662ad0820535e419db5f534a7b41558aee3aaf793b43a1b63f3dc47ad35394"' : 'data-bs-target="#xs-injectables-links-module-AlgoMatchingModule-461cc164ddbb0d7bc1ed11a2db7fff07f4a3cc7d66fd3af84c58c8b82f97dcfb6e662ad0820535e419db5f534a7b41558aee3aaf793b43a1b63f3dc47ad35394"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AlgoMatchingModule-461cc164ddbb0d7bc1ed11a2db7fff07f4a3cc7d66fd3af84c58c8b82f97dcfb6e662ad0820535e419db5f534a7b41558aee3aaf793b43a1b63f3dc47ad35394"' :
                                        'id="xs-injectables-links-module-AlgoMatchingModule-461cc164ddbb0d7bc1ed11a2db7fff07f4a3cc7d66fd3af84c58c8b82f97dcfb6e662ad0820535e419db5f534a7b41558aee3aaf793b43a1b63f3dc47ad35394"' }>
                                        <li class="link">
                                            <a href="injectables/AlgoMatchingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlgoMatchingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-817e44c624495739c05a26b7c8c5b399171ac74a121322919fccb87ff5d2bf4391f2cc927d16f9f43c792f25348638d47fc785209b4289d84c41e33d298d00be"' : 'data-bs-target="#xs-controllers-links-module-AppModule-817e44c624495739c05a26b7c8c5b399171ac74a121322919fccb87ff5d2bf4391f2cc927d16f9f43c792f25348638d47fc785209b4289d84c41e33d298d00be"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-817e44c624495739c05a26b7c8c5b399171ac74a121322919fccb87ff5d2bf4391f2cc927d16f9f43c792f25348638d47fc785209b4289d84c41e33d298d00be"' :
                                            'id="xs-controllers-links-module-AppModule-817e44c624495739c05a26b7c8c5b399171ac74a121322919fccb87ff5d2bf4391f2cc927d16f9f43c792f25348638d47fc785209b4289d84c41e33d298d00be"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/BugsBetaController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BugsBetaController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/CaloriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CaloriesController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/MealsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MealsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-817e44c624495739c05a26b7c8c5b399171ac74a121322919fccb87ff5d2bf4391f2cc927d16f9f43c792f25348638d47fc785209b4289d84c41e33d298d00be"' : 'data-bs-target="#xs-injectables-links-module-AppModule-817e44c624495739c05a26b7c8c5b399171ac74a121322919fccb87ff5d2bf4391f2cc927d16f9f43c792f25348638d47fc785209b4289d84c41e33d298d00be"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-817e44c624495739c05a26b7c8c5b399171ac74a121322919fccb87ff5d2bf4391f2cc927d16f9f43c792f25348638d47fc785209b4289d84c41e33d298d00be"' :
                                        'id="xs-injectables-links-module-AppModule-817e44c624495739c05a26b7c8c5b399171ac74a121322919fccb87ff5d2bf4391f2cc927d16f9f43c792f25348638d47fc785209b4289d84c41e33d298d00be"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BugsBetaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BugsBetaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CaloriesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CaloriesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MealsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MealsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-2a4c82f70b999f427ccc410bad7e4de5d9634c2a19929dc345f2ace4120a0a7709df6ff6c87cdba49af4add116ec74dd1c7eb823fcfb69d46cd482b94135192f"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-2a4c82f70b999f427ccc410bad7e4de5d9634c2a19929dc345f2ace4120a0a7709df6ff6c87cdba49af4add116ec74dd1c7eb823fcfb69d46cd482b94135192f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-2a4c82f70b999f427ccc410bad7e4de5d9634c2a19929dc345f2ace4120a0a7709df6ff6c87cdba49af4add116ec74dd1c7eb823fcfb69d46cd482b94135192f"' :
                                            'id="xs-controllers-links-module-AuthModule-2a4c82f70b999f427ccc410bad7e4de5d9634c2a19929dc345f2ace4120a0a7709df6ff6c87cdba49af4add116ec74dd1c7eb823fcfb69d46cd482b94135192f"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-2a4c82f70b999f427ccc410bad7e4de5d9634c2a19929dc345f2ace4120a0a7709df6ff6c87cdba49af4add116ec74dd1c7eb823fcfb69d46cd482b94135192f"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-2a4c82f70b999f427ccc410bad7e4de5d9634c2a19929dc345f2ace4120a0a7709df6ff6c87cdba49af4add116ec74dd1c7eb823fcfb69d46cd482b94135192f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-2a4c82f70b999f427ccc410bad7e4de5d9634c2a19929dc345f2ace4120a0a7709df6ff6c87cdba49af4add116ec74dd1c7eb823fcfb69d46cd482b94135192f"' :
                                        'id="xs-injectables-links-module-AuthModule-2a4c82f70b999f427ccc410bad7e4de5d9634c2a19929dc345f2ace4120a0a7709df6ff6c87cdba49af4add116ec74dd1c7eb823fcfb69d46cd482b94135192f"' }>
                                        <li class="link">
                                            <a href="injectables/AuthConfig.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthConfig</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BetaUsersModule.html" data-type="entity-link" >BetaUsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BetaUsersModule-86debbba314734ec8bc2c294c18e47e1e014ff8a1f714acd57f2b69d2e12bb984dd90ff11fdd3b7f4ec011ba15d2dae1a72e223a0f1c9eb0c0317d65c1d3fe0c"' : 'data-bs-target="#xs-controllers-links-module-BetaUsersModule-86debbba314734ec8bc2c294c18e47e1e014ff8a1f714acd57f2b69d2e12bb984dd90ff11fdd3b7f4ec011ba15d2dae1a72e223a0f1c9eb0c0317d65c1d3fe0c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BetaUsersModule-86debbba314734ec8bc2c294c18e47e1e014ff8a1f714acd57f2b69d2e12bb984dd90ff11fdd3b7f4ec011ba15d2dae1a72e223a0f1c9eb0c0317d65c1d3fe0c"' :
                                            'id="xs-controllers-links-module-BetaUsersModule-86debbba314734ec8bc2c294c18e47e1e014ff8a1f714acd57f2b69d2e12bb984dd90ff11fdd3b7f4ec011ba15d2dae1a72e223a0f1c9eb0c0317d65c1d3fe0c"' }>
                                            <li class="link">
                                                <a href="controllers/BetaUsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BetaUsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BetaUsersModule-86debbba314734ec8bc2c294c18e47e1e014ff8a1f714acd57f2b69d2e12bb984dd90ff11fdd3b7f4ec011ba15d2dae1a72e223a0f1c9eb0c0317d65c1d3fe0c"' : 'data-bs-target="#xs-injectables-links-module-BetaUsersModule-86debbba314734ec8bc2c294c18e47e1e014ff8a1f714acd57f2b69d2e12bb984dd90ff11fdd3b7f4ec011ba15d2dae1a72e223a0f1c9eb0c0317d65c1d3fe0c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BetaUsersModule-86debbba314734ec8bc2c294c18e47e1e014ff8a1f714acd57f2b69d2e12bb984dd90ff11fdd3b7f4ec011ba15d2dae1a72e223a0f1c9eb0c0317d65c1d3fe0c"' :
                                        'id="xs-injectables-links-module-BetaUsersModule-86debbba314734ec8bc2c294c18e47e1e014ff8a1f714acd57f2b69d2e12bb984dd90ff11fdd3b7f4ec011ba15d2dae1a72e223a0f1c9eb0c0317d65c1d3fe0c"' }>
                                        <li class="link">
                                            <a href="injectables/BetaUsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BetaUsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BugsBetaModule.html" data-type="entity-link" >BugsBetaModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CaloriesModule.html" data-type="entity-link" >CaloriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CaloriesModule-a8b61034ef9a1b3af61c48f8ff7cebb1da39c6931cd450a505816f9dcee46930b9c8070d000dda251d5a4a18a457a935c6d17d77e7cceb9b13b8ab6d07368bcd"' : 'data-bs-target="#xs-controllers-links-module-CaloriesModule-a8b61034ef9a1b3af61c48f8ff7cebb1da39c6931cd450a505816f9dcee46930b9c8070d000dda251d5a4a18a457a935c6d17d77e7cceb9b13b8ab6d07368bcd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CaloriesModule-a8b61034ef9a1b3af61c48f8ff7cebb1da39c6931cd450a505816f9dcee46930b9c8070d000dda251d5a4a18a457a935c6d17d77e7cceb9b13b8ab6d07368bcd"' :
                                            'id="xs-controllers-links-module-CaloriesModule-a8b61034ef9a1b3af61c48f8ff7cebb1da39c6931cd450a505816f9dcee46930b9c8070d000dda251d5a4a18a457a935c6d17d77e7cceb9b13b8ab6d07368bcd"' }>
                                            <li class="link">
                                                <a href="controllers/CaloriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CaloriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CaloriesModule-a8b61034ef9a1b3af61c48f8ff7cebb1da39c6931cd450a505816f9dcee46930b9c8070d000dda251d5a4a18a457a935c6d17d77e7cceb9b13b8ab6d07368bcd"' : 'data-bs-target="#xs-injectables-links-module-CaloriesModule-a8b61034ef9a1b3af61c48f8ff7cebb1da39c6931cd450a505816f9dcee46930b9c8070d000dda251d5a4a18a457a935c6d17d77e7cceb9b13b8ab6d07368bcd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CaloriesModule-a8b61034ef9a1b3af61c48f8ff7cebb1da39c6931cd450a505816f9dcee46930b9c8070d000dda251d5a4a18a457a935c6d17d77e7cceb9b13b8ab6d07368bcd"' :
                                        'id="xs-injectables-links-module-CaloriesModule-a8b61034ef9a1b3af61c48f8ff7cebb1da39c6931cd450a505816f9dcee46930b9c8070d000dda251d5a4a18a457a935c6d17d77e7cceb9b13b8ab6d07368bcd"' }>
                                        <li class="link">
                                            <a href="injectables/CaloriesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CaloriesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChatModule.html" data-type="entity-link" >ChatModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ChatModule-6361c64a02dde581f9d95b87cbdf08458ba3d5c747da477153f1e9a9deabbc27b9dc81a3a40d1202c810f2116080b5ef7e40a968953a86235b908684249f7fea"' : 'data-bs-target="#xs-controllers-links-module-ChatModule-6361c64a02dde581f9d95b87cbdf08458ba3d5c747da477153f1e9a9deabbc27b9dc81a3a40d1202c810f2116080b5ef7e40a968953a86235b908684249f7fea"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ChatModule-6361c64a02dde581f9d95b87cbdf08458ba3d5c747da477153f1e9a9deabbc27b9dc81a3a40d1202c810f2116080b5ef7e40a968953a86235b908684249f7fea"' :
                                            'id="xs-controllers-links-module-ChatModule-6361c64a02dde581f9d95b87cbdf08458ba3d5c747da477153f1e9a9deabbc27b9dc81a3a40d1202c810f2116080b5ef7e40a968953a86235b908684249f7fea"' }>
                                            <li class="link">
                                                <a href="controllers/ChatController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ChatModule-6361c64a02dde581f9d95b87cbdf08458ba3d5c747da477153f1e9a9deabbc27b9dc81a3a40d1202c810f2116080b5ef7e40a968953a86235b908684249f7fea"' : 'data-bs-target="#xs-injectables-links-module-ChatModule-6361c64a02dde581f9d95b87cbdf08458ba3d5c747da477153f1e9a9deabbc27b9dc81a3a40d1202c810f2116080b5ef7e40a968953a86235b908684249f7fea"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ChatModule-6361c64a02dde581f9d95b87cbdf08458ba3d5c747da477153f1e9a9deabbc27b9dc81a3a40d1202c810f2116080b5ef7e40a968953a86235b908684249f7fea"' :
                                        'id="xs-injectables-links-module-ChatModule-6361c64a02dde581f9d95b87cbdf08458ba3d5c747da477153f1e9a9deabbc27b9dc81a3a40d1202c810f2116080b5ef7e40a968953a86235b908684249f7fea"' }>
                                        <li class="link">
                                            <a href="injectables/ChatService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExercisesLibraryModule.html" data-type="entity-link" >ExercisesLibraryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ExercisesLibraryModule-eae89e6ad302003631492a73708f7737c58deffac40b2da761e664005b551619acd927d671c9c69cf643e86795b2e7c0f894eed4b81e7d6d386a65e3f0d6ef3a"' : 'data-bs-target="#xs-controllers-links-module-ExercisesLibraryModule-eae89e6ad302003631492a73708f7737c58deffac40b2da761e664005b551619acd927d671c9c69cf643e86795b2e7c0f894eed4b81e7d6d386a65e3f0d6ef3a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ExercisesLibraryModule-eae89e6ad302003631492a73708f7737c58deffac40b2da761e664005b551619acd927d671c9c69cf643e86795b2e7c0f894eed4b81e7d6d386a65e3f0d6ef3a"' :
                                            'id="xs-controllers-links-module-ExercisesLibraryModule-eae89e6ad302003631492a73708f7737c58deffac40b2da761e664005b551619acd927d671c9c69cf643e86795b2e7c0f894eed4b81e7d6d386a65e3f0d6ef3a"' }>
                                            <li class="link">
                                                <a href="controllers/ExercisesLibraryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExercisesLibraryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ExercisesLibraryModule-eae89e6ad302003631492a73708f7737c58deffac40b2da761e664005b551619acd927d671c9c69cf643e86795b2e7c0f894eed4b81e7d6d386a65e3f0d6ef3a"' : 'data-bs-target="#xs-injectables-links-module-ExercisesLibraryModule-eae89e6ad302003631492a73708f7737c58deffac40b2da761e664005b551619acd927d671c9c69cf643e86795b2e7c0f894eed4b81e7d6d386a65e3f0d6ef3a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ExercisesLibraryModule-eae89e6ad302003631492a73708f7737c58deffac40b2da761e664005b551619acd927d671c9c69cf643e86795b2e7c0f894eed4b81e7d6d386a65e3f0d6ef3a"' :
                                        'id="xs-injectables-links-module-ExercisesLibraryModule-eae89e6ad302003631492a73708f7737c58deffac40b2da761e664005b551619acd927d671c9c69cf643e86795b2e7c0f894eed4b81e7d6d386a65e3f0d6ef3a"' }>
                                        <li class="link">
                                            <a href="injectables/ExercisesLibraryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExercisesLibraryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FileModule.html" data-type="entity-link" >FileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FileModule-ee594a71e59104e9a1187188e9b2ae4bb48cc3637f1ef9b84c638eed1a4df148a6776538d6e15403b63f0fbfa6fe880128422b4472488321fc356c3fa092e3af"' : 'data-bs-target="#xs-controllers-links-module-FileModule-ee594a71e59104e9a1187188e9b2ae4bb48cc3637f1ef9b84c638eed1a4df148a6776538d6e15403b63f0fbfa6fe880128422b4472488321fc356c3fa092e3af"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FileModule-ee594a71e59104e9a1187188e9b2ae4bb48cc3637f1ef9b84c638eed1a4df148a6776538d6e15403b63f0fbfa6fe880128422b4472488321fc356c3fa092e3af"' :
                                            'id="xs-controllers-links-module-FileModule-ee594a71e59104e9a1187188e9b2ae4bb48cc3637f1ef9b84c638eed1a4df148a6776538d6e15403b63f0fbfa6fe880128422b4472488321fc356c3fa092e3af"' }>
                                            <li class="link">
                                                <a href="controllers/FileController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FileModule-ee594a71e59104e9a1187188e9b2ae4bb48cc3637f1ef9b84c638eed1a4df148a6776538d6e15403b63f0fbfa6fe880128422b4472488321fc356c3fa092e3af"' : 'data-bs-target="#xs-injectables-links-module-FileModule-ee594a71e59104e9a1187188e9b2ae4bb48cc3637f1ef9b84c638eed1a4df148a6776538d6e15403b63f0fbfa6fe880128422b4472488321fc356c3fa092e3af"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FileModule-ee594a71e59104e9a1187188e9b2ae4bb48cc3637f1ef9b84c638eed1a4df148a6776538d6e15403b63f0fbfa6fe880128422b4472488321fc356c3fa092e3af"' :
                                        'id="xs-injectables-links-module-FileModule-ee594a71e59104e9a1187188e9b2ae4bb48cc3637f1ef9b84c638eed1a4df148a6776538d6e15403b63f0fbfa6fe880128422b4472488321fc356c3fa092e3af"' }>
                                        <li class="link">
                                            <a href="injectables/FileService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FormModule.html" data-type="entity-link" >FormModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FormModule-153d5c650033cc6b5c7d54b45e87b5e7cba06a302b4b7b380b407dff21889278e375dd3f6251b98fe881fd971fd44fc0d8abbab0b89a4b8fd418e875fb03659a"' : 'data-bs-target="#xs-controllers-links-module-FormModule-153d5c650033cc6b5c7d54b45e87b5e7cba06a302b4b7b380b407dff21889278e375dd3f6251b98fe881fd971fd44fc0d8abbab0b89a4b8fd418e875fb03659a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FormModule-153d5c650033cc6b5c7d54b45e87b5e7cba06a302b4b7b380b407dff21889278e375dd3f6251b98fe881fd971fd44fc0d8abbab0b89a4b8fd418e875fb03659a"' :
                                            'id="xs-controllers-links-module-FormModule-153d5c650033cc6b5c7d54b45e87b5e7cba06a302b4b7b380b407dff21889278e375dd3f6251b98fe881fd971fd44fc0d8abbab0b89a4b8fd418e875fb03659a"' }>
                                            <li class="link">
                                                <a href="controllers/FormController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FormModule-153d5c650033cc6b5c7d54b45e87b5e7cba06a302b4b7b380b407dff21889278e375dd3f6251b98fe881fd971fd44fc0d8abbab0b89a4b8fd418e875fb03659a"' : 'data-bs-target="#xs-injectables-links-module-FormModule-153d5c650033cc6b5c7d54b45e87b5e7cba06a302b4b7b380b407dff21889278e375dd3f6251b98fe881fd971fd44fc0d8abbab0b89a4b8fd418e875fb03659a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FormModule-153d5c650033cc6b5c7d54b45e87b5e7cba06a302b4b7b380b407dff21889278e375dd3f6251b98fe881fd971fd44fc0d8abbab0b89a4b8fd418e875fb03659a"' :
                                        'id="xs-injectables-links-module-FormModule-153d5c650033cc6b5c7d54b45e87b5e7cba06a302b4b7b380b407dff21889278e375dd3f6251b98fe881fd971fd44fc0d8abbab0b89a4b8fd418e875fb03659a"' }>
                                        <li class="link">
                                            <a href="injectables/FormService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MealsModule.html" data-type="entity-link" >MealsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MealsModule-9d718f6143dd92e4e0def797aa7935f6652f44ea0883b19ef5c3eae532a5fde8b43e2ed1e6e12d1373abff23ab17db4d51caa15fa1f6e5a90b199c16058d4d55"' : 'data-bs-target="#xs-controllers-links-module-MealsModule-9d718f6143dd92e4e0def797aa7935f6652f44ea0883b19ef5c3eae532a5fde8b43e2ed1e6e12d1373abff23ab17db4d51caa15fa1f6e5a90b199c16058d4d55"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MealsModule-9d718f6143dd92e4e0def797aa7935f6652f44ea0883b19ef5c3eae532a5fde8b43e2ed1e6e12d1373abff23ab17db4d51caa15fa1f6e5a90b199c16058d4d55"' :
                                            'id="xs-controllers-links-module-MealsModule-9d718f6143dd92e4e0def797aa7935f6652f44ea0883b19ef5c3eae532a5fde8b43e2ed1e6e12d1373abff23ab17db4d51caa15fa1f6e5a90b199c16058d4d55"' }>
                                            <li class="link">
                                                <a href="controllers/MealsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MealsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MealsModule-9d718f6143dd92e4e0def797aa7935f6652f44ea0883b19ef5c3eae532a5fde8b43e2ed1e6e12d1373abff23ab17db4d51caa15fa1f6e5a90b199c16058d4d55"' : 'data-bs-target="#xs-injectables-links-module-MealsModule-9d718f6143dd92e4e0def797aa7935f6652f44ea0883b19ef5c3eae532a5fde8b43e2ed1e6e12d1373abff23ab17db4d51caa15fa1f6e5a90b199c16058d4d55"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MealsModule-9d718f6143dd92e4e0def797aa7935f6652f44ea0883b19ef5c3eae532a5fde8b43e2ed1e6e12d1373abff23ab17db4d51caa15fa1f6e5a90b199c16058d4d55"' :
                                        'id="xs-injectables-links-module-MealsModule-9d718f6143dd92e4e0def797aa7935f6652f44ea0883b19ef5c3eae532a5fde8b43e2ed1e6e12d1373abff23ab17db4d51caa15fa1f6e5a90b199c16058d4d55"' }>
                                        <li class="link">
                                            <a href="injectables/MealsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MealsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MessagesModule.html" data-type="entity-link" >MessagesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MessagesModule-e1b059a161be506a47a6044117793bf7ddea0bf391aed2af3984e5fcf1d2db4690afdd439f1b159ccc2f32ad90d9b7eeffb14788f9251a17f9166281364c6a9b"' : 'data-bs-target="#xs-controllers-links-module-MessagesModule-e1b059a161be506a47a6044117793bf7ddea0bf391aed2af3984e5fcf1d2db4690afdd439f1b159ccc2f32ad90d9b7eeffb14788f9251a17f9166281364c6a9b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MessagesModule-e1b059a161be506a47a6044117793bf7ddea0bf391aed2af3984e5fcf1d2db4690afdd439f1b159ccc2f32ad90d9b7eeffb14788f9251a17f9166281364c6a9b"' :
                                            'id="xs-controllers-links-module-MessagesModule-e1b059a161be506a47a6044117793bf7ddea0bf391aed2af3984e5fcf1d2db4690afdd439f1b159ccc2f32ad90d9b7eeffb14788f9251a17f9166281364c6a9b"' }>
                                            <li class="link">
                                                <a href="controllers/MessagesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessagesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MessagesModule-e1b059a161be506a47a6044117793bf7ddea0bf391aed2af3984e5fcf1d2db4690afdd439f1b159ccc2f32ad90d9b7eeffb14788f9251a17f9166281364c6a9b"' : 'data-bs-target="#xs-injectables-links-module-MessagesModule-e1b059a161be506a47a6044117793bf7ddea0bf391aed2af3984e5fcf1d2db4690afdd439f1b159ccc2f32ad90d9b7eeffb14788f9251a17f9166281364c6a9b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MessagesModule-e1b059a161be506a47a6044117793bf7ddea0bf391aed2af3984e5fcf1d2db4690afdd439f1b159ccc2f32ad90d9b7eeffb14788f9251a17f9166281364c6a9b"' :
                                        'id="xs-injectables-links-module-MessagesModule-e1b059a161be506a47a6044117793bf7ddea0bf391aed2af3984e5fcf1d2db4690afdd439f1b159ccc2f32ad90d9b7eeffb14788f9251a17f9166281364c6a9b"' }>
                                        <li class="link">
                                            <a href="injectables/MessagesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessagesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OpenffModule.html" data-type="entity-link" >OpenffModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-OpenffModule-786bbb610c408a262c13c1353a6c4dc1f26186ec52bb6ef54bdb7fc00a50b4150fd0bda40159560bca59a18bb8c06ae82fe4f13e52314834c17bf42bfb1070df"' : 'data-bs-target="#xs-controllers-links-module-OpenffModule-786bbb610c408a262c13c1353a6c4dc1f26186ec52bb6ef54bdb7fc00a50b4150fd0bda40159560bca59a18bb8c06ae82fe4f13e52314834c17bf42bfb1070df"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OpenffModule-786bbb610c408a262c13c1353a6c4dc1f26186ec52bb6ef54bdb7fc00a50b4150fd0bda40159560bca59a18bb8c06ae82fe4f13e52314834c17bf42bfb1070df"' :
                                            'id="xs-controllers-links-module-OpenffModule-786bbb610c408a262c13c1353a6c4dc1f26186ec52bb6ef54bdb7fc00a50b4150fd0bda40159560bca59a18bb8c06ae82fe4f13e52314834c17bf42bfb1070df"' }>
                                            <li class="link">
                                                <a href="controllers/OpenffController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OpenffController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OpenffModule-786bbb610c408a262c13c1353a6c4dc1f26186ec52bb6ef54bdb7fc00a50b4150fd0bda40159560bca59a18bb8c06ae82fe4f13e52314834c17bf42bfb1070df"' : 'data-bs-target="#xs-injectables-links-module-OpenffModule-786bbb610c408a262c13c1353a6c4dc1f26186ec52bb6ef54bdb7fc00a50b4150fd0bda40159560bca59a18bb8c06ae82fe4f13e52314834c17bf42bfb1070df"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OpenffModule-786bbb610c408a262c13c1353a6c4dc1f26186ec52bb6ef54bdb7fc00a50b4150fd0bda40159560bca59a18bb8c06ae82fe4f13e52314834c17bf42bfb1070df"' :
                                        'id="xs-injectables-links-module-OpenffModule-786bbb610c408a262c13c1353a6c4dc1f26186ec52bb6ef54bdb7fc00a50b4150fd0bda40159560bca59a18bb8c06ae82fe4f13e52314834c17bf42bfb1070df"' }>
                                        <li class="link">
                                            <a href="injectables/OpenffService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OpenffService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PlanningModule.html" data-type="entity-link" >PlanningModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PlanningModule-efbc0ab37203c14644746f1bf079db4b77f709b3a49ee64785a8fbbc1fcd1500ffe47f38052679fa8f0ab970256f2a8a18ea5a8c8891239b3445daae955b5a1b"' : 'data-bs-target="#xs-controllers-links-module-PlanningModule-efbc0ab37203c14644746f1bf079db4b77f709b3a49ee64785a8fbbc1fcd1500ffe47f38052679fa8f0ab970256f2a8a18ea5a8c8891239b3445daae955b5a1b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PlanningModule-efbc0ab37203c14644746f1bf079db4b77f709b3a49ee64785a8fbbc1fcd1500ffe47f38052679fa8f0ab970256f2a8a18ea5a8c8891239b3445daae955b5a1b"' :
                                            'id="xs-controllers-links-module-PlanningModule-efbc0ab37203c14644746f1bf079db4b77f709b3a49ee64785a8fbbc1fcd1500ffe47f38052679fa8f0ab970256f2a8a18ea5a8c8891239b3445daae955b5a1b"' }>
                                            <li class="link">
                                                <a href="controllers/PlanningController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlanningController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PlanningModule-efbc0ab37203c14644746f1bf079db4b77f709b3a49ee64785a8fbbc1fcd1500ffe47f38052679fa8f0ab970256f2a8a18ea5a8c8891239b3445daae955b5a1b"' : 'data-bs-target="#xs-injectables-links-module-PlanningModule-efbc0ab37203c14644746f1bf079db4b77f709b3a49ee64785a8fbbc1fcd1500ffe47f38052679fa8f0ab970256f2a8a18ea5a8c8891239b3445daae955b5a1b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PlanningModule-efbc0ab37203c14644746f1bf079db4b77f709b3a49ee64785a8fbbc1fcd1500ffe47f38052679fa8f0ab970256f2a8a18ea5a8c8891239b3445daae955b5a1b"' :
                                        'id="xs-injectables-links-module-PlanningModule-efbc0ab37203c14644746f1bf079db4b77f709b3a49ee64785a8fbbc1fcd1500ffe47f38052679fa8f0ab970256f2a8a18ea5a8c8891239b3445daae955b5a1b"' }>
                                        <li class="link">
                                            <a href="injectables/PlanningService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlanningService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PreferencesModule.html" data-type="entity-link" >PreferencesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PreferencesModule-fdcbfd4872d20bfaa966962a408cd33801d1b8d18f01a68a429ece2c618d793c16ba35dd6e6c34806449446d208af7907c8728582b49db611724f9be34012a1f"' : 'data-bs-target="#xs-controllers-links-module-PreferencesModule-fdcbfd4872d20bfaa966962a408cd33801d1b8d18f01a68a429ece2c618d793c16ba35dd6e6c34806449446d208af7907c8728582b49db611724f9be34012a1f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PreferencesModule-fdcbfd4872d20bfaa966962a408cd33801d1b8d18f01a68a429ece2c618d793c16ba35dd6e6c34806449446d208af7907c8728582b49db611724f9be34012a1f"' :
                                            'id="xs-controllers-links-module-PreferencesModule-fdcbfd4872d20bfaa966962a408cd33801d1b8d18f01a68a429ece2c618d793c16ba35dd6e6c34806449446d208af7907c8728582b49db611724f9be34012a1f"' }>
                                            <li class="link">
                                                <a href="controllers/PreferencesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PreferencesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PreferencesModule-fdcbfd4872d20bfaa966962a408cd33801d1b8d18f01a68a429ece2c618d793c16ba35dd6e6c34806449446d208af7907c8728582b49db611724f9be34012a1f"' : 'data-bs-target="#xs-injectables-links-module-PreferencesModule-fdcbfd4872d20bfaa966962a408cd33801d1b8d18f01a68a429ece2c618d793c16ba35dd6e6c34806449446d208af7907c8728582b49db611724f9be34012a1f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PreferencesModule-fdcbfd4872d20bfaa966962a408cd33801d1b8d18f01a68a429ece2c618d793c16ba35dd6e6c34806449446d208af7907c8728582b49db611724f9be34012a1f"' :
                                        'id="xs-injectables-links-module-PreferencesModule-fdcbfd4872d20bfaa966962a408cd33801d1b8d18f01a68a429ece2c618d793c16ba35dd6e6c34806449446d208af7907c8728582b49db611724f9be34012a1f"' }>
                                        <li class="link">
                                            <a href="injectables/PreferencesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PreferencesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrismaModule-c3825d437e84d4500343a0129aba19f3c6ae04d73d62f19584e96671d6b4895a2b68b0f3ae32bb855481d9287e0a286c9848aa65d3d386c861f577d44cc06cd4"' : 'data-bs-target="#xs-injectables-links-module-PrismaModule-c3825d437e84d4500343a0129aba19f3c6ae04d73d62f19584e96671d6b4895a2b68b0f3ae32bb855481d9287e0a286c9848aa65d3d386c861f577d44cc06cd4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-c3825d437e84d4500343a0129aba19f3c6ae04d73d62f19584e96671d6b4895a2b68b0f3ae32bb855481d9287e0a286c9848aa65d3d386c861f577d44cc06cd4"' :
                                        'id="xs-injectables-links-module-PrismaModule-c3825d437e84d4500343a0129aba19f3c6ae04d73d62f19584e96671d6b4895a2b68b0f3ae32bb855481d9287e0a286c9848aa65d3d386c861f577d44cc06cd4"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReportsModule.html" data-type="entity-link" >ReportsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ReportsModule-a48e2cd2cec676b46a35e9036d546ca97293e00cbdb3bbc370145fe171bb288619f6fb26f49ce492555045470be5a0010ab2d32de43a437cd5fc33c85586753a"' : 'data-bs-target="#xs-controllers-links-module-ReportsModule-a48e2cd2cec676b46a35e9036d546ca97293e00cbdb3bbc370145fe171bb288619f6fb26f49ce492555045470be5a0010ab2d32de43a437cd5fc33c85586753a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReportsModule-a48e2cd2cec676b46a35e9036d546ca97293e00cbdb3bbc370145fe171bb288619f6fb26f49ce492555045470be5a0010ab2d32de43a437cd5fc33c85586753a"' :
                                            'id="xs-controllers-links-module-ReportsModule-a48e2cd2cec676b46a35e9036d546ca97293e00cbdb3bbc370145fe171bb288619f6fb26f49ce492555045470be5a0010ab2d32de43a437cd5fc33c85586753a"' }>
                                            <li class="link">
                                                <a href="controllers/ReportsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReportsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ReportsModule-a48e2cd2cec676b46a35e9036d546ca97293e00cbdb3bbc370145fe171bb288619f6fb26f49ce492555045470be5a0010ab2d32de43a437cd5fc33c85586753a"' : 'data-bs-target="#xs-injectables-links-module-ReportsModule-a48e2cd2cec676b46a35e9036d546ca97293e00cbdb3bbc370145fe171bb288619f6fb26f49ce492555045470be5a0010ab2d32de43a437cd5fc33c85586753a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReportsModule-a48e2cd2cec676b46a35e9036d546ca97293e00cbdb3bbc370145fe171bb288619f6fb26f49ce492555045470be5a0010ab2d32de43a437cd5fc33c85586753a"' :
                                        'id="xs-injectables-links-module-ReportsModule-a48e2cd2cec676b46a35e9036d546ca97293e00cbdb3bbc370145fe171bb288619f6fb26f49ce492555045470be5a0010ab2d32de43a437cd5fc33c85586753a"' }>
                                        <li class="link">
                                            <a href="injectables/ReportsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReportsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SportsExerciseModule.html" data-type="entity-link" >SportsExerciseModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SportsExerciseModule-209cdb78f2e45e5ae4288e1b118473cec0d67d570fbe0744456322e25a8580b6e7d78d2cf351b0d76bb6a2eed7d4c3343976529b977d739b1b408b131a60e6ef"' : 'data-bs-target="#xs-controllers-links-module-SportsExerciseModule-209cdb78f2e45e5ae4288e1b118473cec0d67d570fbe0744456322e25a8580b6e7d78d2cf351b0d76bb6a2eed7d4c3343976529b977d739b1b408b131a60e6ef"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SportsExerciseModule-209cdb78f2e45e5ae4288e1b118473cec0d67d570fbe0744456322e25a8580b6e7d78d2cf351b0d76bb6a2eed7d4c3343976529b977d739b1b408b131a60e6ef"' :
                                            'id="xs-controllers-links-module-SportsExerciseModule-209cdb78f2e45e5ae4288e1b118473cec0d67d570fbe0744456322e25a8580b6e7d78d2cf351b0d76bb6a2eed7d4c3343976529b977d739b1b408b131a60e6ef"' }>
                                            <li class="link">
                                                <a href="controllers/SportsExerciseController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SportsExerciseController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SportsExerciseModule-209cdb78f2e45e5ae4288e1b118473cec0d67d570fbe0744456322e25a8580b6e7d78d2cf351b0d76bb6a2eed7d4c3343976529b977d739b1b408b131a60e6ef"' : 'data-bs-target="#xs-injectables-links-module-SportsExerciseModule-209cdb78f2e45e5ae4288e1b118473cec0d67d570fbe0744456322e25a8580b6e7d78d2cf351b0d76bb6a2eed7d4c3343976529b977d739b1b408b131a60e6ef"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SportsExerciseModule-209cdb78f2e45e5ae4288e1b118473cec0d67d570fbe0744456322e25a8580b6e7d78d2cf351b0d76bb6a2eed7d4c3343976529b977d739b1b408b131a60e6ef"' :
                                        'id="xs-injectables-links-module-SportsExerciseModule-209cdb78f2e45e5ae4288e1b118473cec0d67d570fbe0744456322e25a8580b6e7d78d2cf351b0d76bb6a2eed7d4c3343976529b977d739b1b408b131a60e6ef"' }>
                                        <li class="link">
                                            <a href="injectables/SportsExerciseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SportsExerciseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StepsModule.html" data-type="entity-link" >StepsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-StepsModule-b2913e1e2630bf27cc067d2530cdc04801d1ab52611d4e4c403de629f55c7d209434a66edb2eb33876f8cc253a33636be7580ed19b8c1417ef72996de5b4ee5f"' : 'data-bs-target="#xs-controllers-links-module-StepsModule-b2913e1e2630bf27cc067d2530cdc04801d1ab52611d4e4c403de629f55c7d209434a66edb2eb33876f8cc253a33636be7580ed19b8c1417ef72996de5b4ee5f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StepsModule-b2913e1e2630bf27cc067d2530cdc04801d1ab52611d4e4c403de629f55c7d209434a66edb2eb33876f8cc253a33636be7580ed19b8c1417ef72996de5b4ee5f"' :
                                            'id="xs-controllers-links-module-StepsModule-b2913e1e2630bf27cc067d2530cdc04801d1ab52611d4e4c403de629f55c7d209434a66edb2eb33876f8cc253a33636be7580ed19b8c1417ef72996de5b4ee5f"' }>
                                            <li class="link">
                                                <a href="controllers/StepsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StepsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-StepsModule-b2913e1e2630bf27cc067d2530cdc04801d1ab52611d4e4c403de629f55c7d209434a66edb2eb33876f8cc253a33636be7580ed19b8c1417ef72996de5b4ee5f"' : 'data-bs-target="#xs-injectables-links-module-StepsModule-b2913e1e2630bf27cc067d2530cdc04801d1ab52611d4e4c403de629f55c7d209434a66edb2eb33876f8cc253a33636be7580ed19b8c1417ef72996de5b4ee5f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StepsModule-b2913e1e2630bf27cc067d2530cdc04801d1ab52611d4e4c403de629f55c7d209434a66edb2eb33876f8cc253a33636be7580ed19b8c1417ef72996de5b4ee5f"' :
                                        'id="xs-injectables-links-module-StepsModule-b2913e1e2630bf27cc067d2530cdc04801d1ab52611d4e4c403de629f55c7d209434a66edb2eb33876f8cc253a33636be7580ed19b8c1417ef72996de5b4ee5f"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StepsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StepsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserInfosModule.html" data-type="entity-link" >UserInfosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserInfosModule-f9802a0e0c7bc1b2c25132ceedb0e8f63bff1f19110dd223a51c3295d5b46f106874482ce7c7766925c60289b2d1d4cd5ddc1e72331bb9ae4687014d5f0b6253"' : 'data-bs-target="#xs-controllers-links-module-UserInfosModule-f9802a0e0c7bc1b2c25132ceedb0e8f63bff1f19110dd223a51c3295d5b46f106874482ce7c7766925c60289b2d1d4cd5ddc1e72331bb9ae4687014d5f0b6253"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserInfosModule-f9802a0e0c7bc1b2c25132ceedb0e8f63bff1f19110dd223a51c3295d5b46f106874482ce7c7766925c60289b2d1d4cd5ddc1e72331bb9ae4687014d5f0b6253"' :
                                            'id="xs-controllers-links-module-UserInfosModule-f9802a0e0c7bc1b2c25132ceedb0e8f63bff1f19110dd223a51c3295d5b46f106874482ce7c7766925c60289b2d1d4cd5ddc1e72331bb9ae4687014d5f0b6253"' }>
                                            <li class="link">
                                                <a href="controllers/UserInfosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserInfosController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserInfosModule-f9802a0e0c7bc1b2c25132ceedb0e8f63bff1f19110dd223a51c3295d5b46f106874482ce7c7766925c60289b2d1d4cd5ddc1e72331bb9ae4687014d5f0b6253"' : 'data-bs-target="#xs-injectables-links-module-UserInfosModule-f9802a0e0c7bc1b2c25132ceedb0e8f63bff1f19110dd223a51c3295d5b46f106874482ce7c7766925c60289b2d1d4cd5ddc1e72331bb9ae4687014d5f0b6253"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserInfosModule-f9802a0e0c7bc1b2c25132ceedb0e8f63bff1f19110dd223a51c3295d5b46f106874482ce7c7766925c60289b2d1d4cd5ddc1e72331bb9ae4687014d5f0b6253"' :
                                        'id="xs-injectables-links-module-UserInfosModule-f9802a0e0c7bc1b2c25132ceedb0e8f63bff1f19110dd223a51c3295d5b46f106874482ce7c7766925c60289b2d1d4cd5ddc1e72331bb9ae4687014d5f0b6253"' }>
                                        <li class="link">
                                            <a href="injectables/UserInfoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserInfoService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AuthDto.html" data-type="entity-link" >AuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/BetaUsersDto.html" data-type="entity-link" >BetaUsersDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/BugsBetaDto.html" data-type="entity-link" >BugsBetaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChatGateway.html" data-type="entity-link" >ChatGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateExercisesLibraryDto.html" data-type="entity-link" >CreateExercisesLibraryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOpenffDto.html" data-type="entity-link" >CreateOpenffDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditInfosDto.html" data-type="entity-link" >EditInfosDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FormDto.html" data-type="entity-link" >FormDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MealsDto.html" data-type="entity-link" >MealsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Rooms.html" data-type="entity-link" >Rooms</a>
                            </li>
                            <li class="link">
                                <a href="classes/SportsExerciseDto.html" data-type="entity-link" >SportsExerciseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBugsBetaDto.html" data-type="entity-link" >UpdateBugsBetaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateExercisesLibraryDto.html" data-type="entity-link" >UpdateExercisesLibraryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMealsDto.html" data-type="entity-link" >UpdateMealsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateOpenffDto.html" data-type="entity-link" >UpdateOpenffDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePreferenceDto.html" data-type="entity-link" >UpdatePreferenceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserInfosDto.html" data-type="entity-link" >UserInfosDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserNotFoundException.html" data-type="entity-link" >UserNotFoundException</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserNotFoundException-1.html" data-type="entity-link" >UserNotFoundException</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserNotFoundException-2.html" data-type="entity-link" >UserNotFoundException</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserWithoutSidekickException.html" data-type="entity-link" >UserWithoutSidekickException</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AtGuard.html" data-type="entity-link" >AtGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});