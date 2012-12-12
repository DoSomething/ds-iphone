//
//  FlurryPlugin.h
//  toontheatre
//
//  Created by kamal on 08/09/11.
//  Copyright 2011 Kamal. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

@interface FlurryPlugin : CDVPlugin {
}

- (void)logPageView:(NSMutableArray*) withDict:(NSMutableDictionary*)options;
- (void)logEvent:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
- (void)logEventWithParameters:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options;
@end
