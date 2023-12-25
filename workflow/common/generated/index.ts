/** Load Dependency Source Graphs */

import '@brentbahry/reflection';
import '@proteinjs/db';
import '@proteinjs/service';
import 'moment';


/** Generate Source Graph */

const sourceGraph = "{\"options\":{\"directed\":true,\"multigraph\":false,\"compound\":false},\"nodes\":[{\"v\":\"@proteinjs/workflow-common/WorkflowExecution\",\"value\":{\"packageName\":\"@proteinjs/workflow-common\",\"name\":\"WorkflowExecution\",\"filePath\":\"/Users/brentbahry/repos/components/workflow/common/src/tables/WorkflowExecutionTable.ts\",\"qualifiedName\":\"@proteinjs/workflow-common/WorkflowExecution\",\"properties\":[{\"name\":\"workflow\",\"type\":{\"packageName\":\"\",\"name\":\"Reference<Workflow>\",\"filePath\":null,\"qualifiedName\":\"/Reference<Workflow>\",\"typeParameters\":null,\"directParents\":null},\"isOptional\":false,\"isAbstract\":false,\"isStatic\":false,\"visibility\":\"public\"},{\"name\":\"currentStep\",\"type\":{\"packageName\":\"\",\"name\":\"Reference<WorkflowStep>\",\"filePath\":null,\"qualifiedName\":\"/Reference<WorkflowStep>\",\"typeParameters\":null,\"directParents\":null},\"isOptional\":false,\"isAbstract\":false,\"isStatic\":false,\"visibility\":\"public\"},{\"name\":\"status\",\"type\":{\"packageName\":\"\",\"name\":\"'pending'|'active'|'success'|'failure'\",\"filePath\":null,\"qualifiedName\":\"/'pending'|'active'|'success'|'failure'\",\"typeParameters\":null,\"directParents\":null},\"isOptional\":false,\"isAbstract\":false,\"isStatic\":false,\"visibility\":\"public\"}],\"methods\":[],\"typeParameters\":[],\"directParents\":[{\"packageName\":\"@proteinjs/db\",\"name\":\"Record\",\"filePath\":null,\"qualifiedName\":\"@proteinjs/db/Record\",\"properties\":[],\"methods\":[],\"typeParameters\":[],\"directParents\":[]}],\"sourceType\":3}},{\"v\":\"@proteinjs/db/Record\"},{\"v\":\"@proteinjs/workflow-common/WorkflowExecutionTable\",\"value\":{\"packageName\":\"@proteinjs/workflow-common\",\"name\":\"WorkflowExecutionTable\",\"filePath\":\"/Users/brentbahry/repos/components/workflow/common/src/tables/WorkflowExecutionTable.ts\",\"qualifiedName\":\"@proteinjs/workflow-common/WorkflowExecutionTable\",\"isAbstract\":false,\"isStatic\":false,\"visibility\":\"public\",\"properties\":[{\"name\":\"name\",\"type\":null,\"isOptional\":false,\"isAbstract\":false,\"isStatic\":false,\"visibility\":\"public\"},{\"name\":\"columns\",\"type\":null,\"isOptional\":false,\"isAbstract\":false,\"isStatic\":false,\"visibility\":\"public\"}],\"methods\":[],\"typeParameters\":[],\"directParentInterfaces\":[],\"directParentClasses\":[{\"packageName\":\"@proteinjs/db\",\"name\":\"Table\",\"filePath\":null,\"qualifiedName\":\"@proteinjs/db/Table\",\"isAbstract\":false,\"isStatic\":false,\"visibility\":\"public\",\"properties\":[],\"methods\":[],\"typeParameters\":[\"@proteinjs/workflow-common/WorkflowExecution\"],\"directParentInterfaces\":[],\"directParentClasses\":[]}],\"sourceType\":2}},{\"v\":\"@proteinjs/db/Table\"},{\"v\":\"@proteinjs/workflow-common/WorkflowStep\",\"value\":{\"packageName\":\"@proteinjs/workflow-common\",\"name\":\"WorkflowStep\",\"filePath\":\"/Users/brentbahry/repos/components/workflow/common/src/tables/WorkflowStepTable.ts\",\"qualifiedName\":\"@proteinjs/workflow-common/WorkflowStep\",\"properties\":[{\"name\":\"name\",\"type\":{\"packageName\":\"\",\"name\":\"string\",\"filePath\":null,\"qualifiedName\":\"/string\",\"typeParameters\":null,\"directParents\":null},\"isOptional\":false,\"isAbstract\":false,\"isStatic\":false,\"visibility\":\"public\"},{\"name\":\"description\",\"type\":{\"packageName\":\"\",\"name\":\"string\",\"filePath\":null,\"qualifiedName\":\"/string\",\"typeParameters\":null,\"directParents\":null},\"isOptional\":false,\"isAbstract\":false,\"isStatic\":false,\"visibility\":\"public\"}],\"methods\":[],\"typeParameters\":[],\"directParents\":[{\"packageName\":\"@proteinjs/db\",\"name\":\"SourceRecord\",\"filePath\":null,\"qualifiedName\":\"@proteinjs/db/SourceRecord\",\"properties\":[],\"methods\":[],\"typeParameters\":[],\"directParents\":[]}],\"sourceType\":3}},{\"v\":\"@proteinjs/db/SourceRecord\"},{\"v\":\"@proteinjs/workflow-common/WorkflowStepTable\",\"value\":{\"packageName\":\"@proteinjs/workflow-common\",\"name\":\"WorkflowStepTable\",\"filePath\":\"/Users/brentbahry/repos/components/workflow/common/src/tables/WorkflowStepTable.ts\",\"qualifiedName\":\"@proteinjs/workflow-common/WorkflowStepTable\",\"isAbstract\":false,\"isStatic\":false,\"visibility\":\"public\",\"properties\":[{\"name\":\"name\",\"type\":null,\"isOptional\":false,\"isAbstract\":false,\"isStatic\":false,\"visibility\":\"public\"},{\"name\":\"columns\",\"type\":null,\"isOptional\":false,\"isAbstract\":false,\"isStatic\":false,\"visibility\":\"public\"},{\"name\":\"loadRecordsFromSource\",\"type\":null,\"isOptional\":false,\"isAbstract\":false,\"isStatic\":false,\"visibility\":\"public\"}],\"methods\":[],\"typeParameters\":[],\"directParentInterfaces\":[],\"directParentClasses\":[{\"packageName\":\"@proteinjs/db\",\"name\":\"Table\",\"filePath\":null,\"qualifiedName\":\"@proteinjs/db/Table\",\"isAbstract\":false,\"isStatic\":false,\"visibility\":\"public\",\"properties\":[],\"methods\":[],\"typeParameters\":[\"@proteinjs/workflow-common/WorkflowStep\"],\"directParentInterfaces\":[],\"directParentClasses\":[]}],\"sourceType\":2}},{\"v\":\"@proteinjs/workflow-common/Workflow\",\"value\":{\"packageName\":\"@proteinjs/workflow-common\",\"name\":\"Workflow\",\"filePath\":\"/Users/brentbahry/repos/components/workflow/common/src/tables/WorkflowTable.ts\",\"qualifiedName\":\"@proteinjs/workflow-common/Workflow\",\"properties\":[{\"name\":\"name\",\"type\":{\"packageName\":\"\",\"name\":\"string\",\"filePath\":null,\"qualifiedName\":\"/string\",\"typeParameters\":null,\"directParents\":null},\"isOptional\":false,\"isAbstract\":false,\"isStatic\":false,\"visibility\":\"public\"},{\"name\":\"description\",\"type\":{\"packageName\":\"\",\"name\":\"string\",\"filePath\":null,\"qualifiedName\":\"/string\",\"typeParameters\":null,\"directParents\":null},\"isOptional\":false,\"isAbstract\":false,\"isStatic\":false,\"visibility\":\"public\"},{\"name\":\"steps\",\"type\":{\"packageName\":\"\",\"name\":\"ReferenceArray<WorkflowStep>\",\"filePath\":null,\"qualifiedName\":\"/ReferenceArray<WorkflowStep>\",\"typeParameters\":null,\"directParents\":null},\"isOptional\":false,\"isAbstract\":false,\"isStatic\":false,\"visibility\":\"public\"}],\"methods\":[],\"typeParameters\":[],\"directParents\":[{\"packageName\":\"@proteinjs/db\",\"name\":\"SourceRecord\",\"filePath\":null,\"qualifiedName\":\"@proteinjs/db/SourceRecord\",\"properties\":[],\"methods\":[],\"typeParameters\":[],\"directParents\":[]}],\"sourceType\":3}},{\"v\":\"@proteinjs/workflow-common/WorkflowTable\",\"value\":{\"packageName\":\"@proteinjs/workflow-common\",\"name\":\"WorkflowTable\",\"filePath\":\"/Users/brentbahry/repos/components/workflow/common/src/tables/WorkflowTable.ts\",\"qualifiedName\":\"@proteinjs/workflow-common/WorkflowTable\",\"isAbstract\":false,\"isStatic\":false,\"visibility\":\"public\",\"properties\":[{\"name\":\"name\",\"type\":null,\"isOptional\":false,\"isAbstract\":false,\"isStatic\":false,\"visibility\":\"public\"},{\"name\":\"columns\",\"type\":null,\"isOptional\":false,\"isAbstract\":false,\"isStatic\":false,\"visibility\":\"public\"},{\"name\":\"loadRecordsFromSource\",\"type\":null,\"isOptional\":false,\"isAbstract\":false,\"isStatic\":false,\"visibility\":\"public\"}],\"methods\":[],\"typeParameters\":[],\"directParentInterfaces\":[],\"directParentClasses\":[{\"packageName\":\"@proteinjs/db\",\"name\":\"Table\",\"filePath\":null,\"qualifiedName\":\"@proteinjs/db/Table\",\"isAbstract\":false,\"isStatic\":false,\"visibility\":\"public\",\"properties\":[],\"methods\":[],\"typeParameters\":[\"@proteinjs/workflow-common/Workflow\"],\"directParentInterfaces\":[],\"directParentClasses\":[]}],\"sourceType\":2}}],\"edges\":[{\"v\":\"@proteinjs/workflow-common/WorkflowExecution\",\"w\":\"@proteinjs/db/Record\",\"value\":\"extends interface\"},{\"v\":\"@proteinjs/workflow-common/WorkflowExecutionTable\",\"w\":\"@proteinjs/db/Table\",\"value\":\"extends class\"},{\"v\":\"@proteinjs/workflow-common/WorkflowStep\",\"w\":\"@proteinjs/db/SourceRecord\",\"value\":\"extends interface\"},{\"v\":\"@proteinjs/workflow-common/WorkflowStepTable\",\"w\":\"@proteinjs/db/Table\",\"value\":\"extends class\"},{\"v\":\"@proteinjs/workflow-common/Workflow\",\"w\":\"@proteinjs/db/SourceRecord\",\"value\":\"extends interface\"},{\"v\":\"@proteinjs/workflow-common/WorkflowTable\",\"w\":\"@proteinjs/db/Table\",\"value\":\"extends class\"}]}";


/** Generate Source Links */

import { WorkflowExecutionTable } from '../src/tables/WorkflowExecutionTable';
import { WorkflowStepTable } from '../src/tables/WorkflowStepTable';
import { WorkflowTable } from '../src/tables/WorkflowTable';

const sourceLinks = {
	'@proteinjs/workflow-common/WorkflowExecutionTable': WorkflowExecutionTable,
	'@proteinjs/workflow-common/WorkflowStepTable': WorkflowStepTable,
	'@proteinjs/workflow-common/WorkflowTable': WorkflowTable,
};


/** Load Source Graph and Links */

import { SourceRepository } from '@brentbahry/reflection';
SourceRepository.merge(sourceGraph, sourceLinks);


export * from '../index';