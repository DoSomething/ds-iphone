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

- (void)logPageView:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options;
- (void)logEvent:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options;
- (void)logEventTimed:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options;
- (void)logEventWithParameters:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options;
- (void)logEventWithParametersTimed:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options;
- (void)endTimedEventWithParameters:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options;
- (void)logError:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options;
- (void)setAge:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options;
- (void)setGender:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options;
- (void)setUserID:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options;
- (void)setLocation:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options;

@end
