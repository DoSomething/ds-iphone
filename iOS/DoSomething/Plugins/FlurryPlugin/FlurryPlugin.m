//
//  FlurryPlugin.m
//  toontheatre
//
//  Created by kamal on 08/09/11.
//  Copyright 2011 Kamal. All rights reserved.
//

#import "FlurryPlugin.h"
#import "Flurry.h"

@implementation FlurryPlugin

- (void)logPageView:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options  
{
    [Flurry logPageView];
    NSLog(@"PageView logged");
}

- (void)logEvent:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options  
{
    NSString *event = [options objectForKey:@"event"] ?: @"unknown-event";
    
    [Flurry logEvent:event];
    NSLog(@"Logged event for %@", event);
}

- (void)logEventTimed:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options
{
    NSString *event = [options objectForKey:@"event"] ?: @"unknown-event";
    
    [Flurry logEvent:event timed:YES];
    NSLog(@"Logging timed event for %@", event);
}

- (void)logEventWithParameters:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options
{
    NSString *event = [options objectForKey:@"event"] ?: @"unknown-event";
    NSMutableDictionary *params = [options objectForKey:@"params"] ?: [[NSMutableDictionary alloc] init];
    
    [Flurry logEvent:event withParameters:params];
    NSLog(@"Logged event for %@ with parameters %@", event, params);
}

- (void)logEventWithParametersTimed:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options
{
    NSString *event = [options objectForKey:@"event"] ?: @"unknown-event";
    NSMutableDictionary *params = [options objectForKey:@"params"] ?: [[NSMutableDictionary alloc] init];
    
    [Flurry logEvent:event withParameters:params timed:YES];
    NSLog(@"Logging timed event for %@ with parameters %@", event, params);
}

- (void)endTimedEventWithParameters:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options
{
    NSString *event = [options objectForKey:@"event"] ?: @"unknown-event";
    NSMutableDictionary *params = [options objectForKey:@"params"] ?: [[NSMutableDictionary alloc] init];
    
    [Flurry endTimedEvent:event withParameters:params];
    NSLog(@"Ending timed event %@ with parameters %@", event, params);
}

- (void)logError:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options
{
    NSString *error = [options objectForKey:@"error"] ?: @"unknown-error";
    NSString *message = [options objectForKey:@"message"] ?: @"";
    
    [Flurry logError:error message:message error:NULL];
    NSLog(@"Logging Flurry error: %@ with message: %@", error, message);
}

- (void)setAge:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options
{
    NSNumber *nsAge = [options objectForKey:@"age"] ?: 0;
    int age = [nsAge intValue];
    
    [Flurry setAge:age];
}

- (void)setGender:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options
{
    NSString *gender = [options objectForKey:@"gender"];
    
    if ([gender compare:@"m"] == NSOrderedSame || [gender compare:@"f"] == NSOrderedSame) {
        [Flurry setGender:gender];
    }
    else {
        NSLog(@"Could not set Flurry gender value. Only 'm' and 'f' are valid inputs.");
    }
}

- (void)setUserID:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options
{
    NSString *user_id = [options objectForKey:@"userid"];
    
    [Flurry setUserID:user_id];
}

- (void)setLocation:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options
{
    NSNumber *nsLat = [options objectForKey:@"latitude"];
    NSNumber *nsLon = [options objectForKey:@"longitude"];
    NSNumber *nsHAcc = [options objectForKey:@"horizontal_acc"];
    NSNumber *nsVAcc = [options objectForKey:@"vertical_acc"];
    
    double lat = [nsLat doubleValue];
    double lon = [nsLon doubleValue];
    float hAcc = [nsHAcc floatValue];
    float vAcc = [nsVAcc floatValue];

    [Flurry setLatitude:lat longitude:lon horizontalAccuracy:hAcc verticalAccuracy:vAcc];
    NSLog(@"Logging Flurry location to lat:%f, lon:%f, h_acc:%f, vAcc:%f", lat, lon, hAcc, vAcc);
}

@end
