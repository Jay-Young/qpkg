/*!
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { GoogleAuth } from 'google-auth-library';
import { ServiceContext } from '../index';
/**
 * Create a descriptor for Cloud Functions.
 *
 * @returns {object}
 */
export declare function getCloudFunctionDescriptor(): Promise<{
    type: string;
    labels: {
        function_name: string | undefined;
        region: string | undefined;
    };
}>;
/**
 * Create a descriptor for Cloud Run.
 *
 * @returns {object}
 */
export declare function getCloudRunDescriptor(): Promise<{
    type: string;
    labels: {
        location: string | undefined;
        service_name: string | undefined;
        revision_name: string | undefined;
        configuration_name: string | undefined;
    };
}>;
/**
 * Create a descriptor for Google App Engine.
 *
 * @returns {object}
 */
export declare function getGAEDescriptor(): Promise<{
    type: string;
    labels: {
        module_id: string | undefined;
        version_id: string | undefined;
        zone: string | undefined;
    };
}>;
/**
 * Create a descriptor for Google Compute Engine.
 * @return {object}
 */
export declare function getGCEDescriptor(): Promise<{
    type: string;
    labels: {
        instance_id: any;
        zone: string | undefined;
    };
}>;
export declare const KUBERNETES_NAMESPACE_ID_PATH = "/var/run/secrets/kubernetes.io/serviceaccount/namespace";
/**
 * Create a descriptor for Google Container Engine.
 *
 * @return {object}
 */
export declare function getGKEDescriptor(): Promise<{
    type: string;
    labels: {
        location: string | undefined;
        cluster_name: any;
        namespace_name: string;
        pod_name: string | undefined;
        container_name: string | undefined;
    };
}>;
/**
 * Create a global descriptor.
 *
 * @returns {object}
 */
export declare function getGlobalDescriptor(): {
    type: string;
};
/**
 * Attempt to contact the metadata service and determine,
 * based on request success and environment variables, what type of resource
 * the library is operating on.
 */
export declare function getDefaultResource(auth: GoogleAuth): Promise<{
    type: string;
}>;
/**
 * For logged errors, users can provide a service context. This enables errors
 * to be picked up Cloud Error Reporting. For more information see
 * [this guide]{@link
 * https://cloud.google.com/error-reporting/docs/formatting-error-messages} and
 * the [official documentation]{@link
 * https://cloud.google.com/error-reporting/reference/rest/v1beta1/ServiceContext}.
 */
export declare function detectServiceContext(auth: GoogleAuth): Promise<ServiceContext | null>;
